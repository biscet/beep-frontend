import axios from 'axios';
import { storage } from 'src/lib/storage';
import { CONFIG, TOKENS } from 'src/dict/config';
import { isEmpty, saltString } from 'src/lib/lodash';
import { logoutFn } from 'src/models/Helpers/Logout';

const { ACCESS, REFRESH } = TOKENS;
const { PROCESSUNG_API_URL, PROJECTS_API_URL, USERS_API_URL } = CONFIG;

const axiosConfig = (url) => ({
  baseURL: url,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const userInstance = axios.create(axiosConfig(USERS_API_URL));
const projectsInstance = axios.create(axiosConfig(PROJECTS_API_URL));
const processingInstance = axios.create(axiosConfig(PROCESSUNG_API_URL));

let refreshPromise;

class RefreshTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}

const sendRefreshTokenRequest = async (refreshToken) => userInstance.post('/auth/refresh', { [REFRESH]: refreshToken });

const refreshTokens = async () => {
  const refreshToken = await storage.get(REFRESH);
  const saltedRefreshToken = isEmpty(refreshToken) ? '' : saltString(refreshToken, false);

  if (!saltedRefreshToken) {
    throw new RefreshTokenError('Пользователь не авторизован');
  }

  try {
    refreshPromise = refreshPromise || sendRefreshTokenRequest(saltedRefreshToken);

    const refreshedTokens = await refreshPromise;

    storage.set(ACCESS, saltString(refreshedTokens?.access_token, true));
  } finally {
    refreshPromise = undefined;
  }
};

const handleRetryRequestErrors = (errorFromSecondRequest) => {
  const isRetryRequestUnauthorized = errorFromSecondRequest.response?.status === 401;
  const isRefreshTokenRequestFailed = errorFromSecondRequest instanceof RefreshTokenError;
  const isFailedToRefreshTokens = isRefreshTokenRequestFailed || isRetryRequestUnauthorized;

  if (isFailedToRefreshTokens || errorFromSecondRequest.response?.status === 502) {
    logoutFn();
  }

  throw errorFromSecondRequest;
};

const retryRequest = async (originalReq) => {
  const retryRequestObject = { ...originalReq };

  retryRequestObject.isRetryAttempt = true;
  retryRequestObject.headers.Authorization = userInstance.defaults.headers.common.Authorization;

  const retryRequestResponse = await userInstance.request(retryRequestObject);

  return retryRequestResponse;
};

const handleResponseError = async (error) => {
  const { config: originalReq, response } = error;
  const isRefreshRequest = originalReq.url === '/auth/refresh';
  const isLoginRequest = originalReq.url === '/auth/login';
  const isSecondAttempt = originalReq.isRetryAttempt;
  const isOriginalRequestUnauthorized = response?.status === 401;

  if (isRefreshRequest || isLoginRequest || isSecondAttempt || !isOriginalRequestUnauthorized) {
    throw error;
  }

  if (isRefreshRequest && !isOriginalRequestUnauthorized) {
    logoutFn();
  }

  try {
    await refreshTokens();
    const retryRequestResponse = retryRequest(originalReq);

    return retryRequestResponse;
  } catch (repeatedError) {
    return handleRetryRequestErrors(repeatedError);
  }
};

const addAuthHeaderToRequest = async (requestConfig) => {
  const accessToken = await storage.get(ACCESS);
  const saltedAccessToken = isEmpty(accessToken) ? '' : saltString(accessToken, false);

  const updatedConfig = requestConfig;

  if (saltedAccessToken) {
    updatedConfig.headers.Authorization = `Bearer ${saltedAccessToken}`;
  }

  return updatedConfig;
};

const initiateTokensInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (requestConfig) => addAuthHeaderToRequest(requestConfig),
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => handleResponseError(error),
  );
};

[userInstance, processingInstance, projectsInstance].forEach((instance) => {
  initiateTokensInterceptors(instance);
});

export { userInstance, processingInstance, projectsInstance };