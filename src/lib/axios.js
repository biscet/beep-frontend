import axios from 'axios';
import { storage } from 'src/lib/storage';
import { CONFIG, TOKENS } from 'src/dict/config';
import { isEmpty, saltString } from 'src/lib/lodash';
import { logoutFn } from 'src/models/User';

const { ACCESS, REFRESH } = TOKENS;

const axiosConfig = {
  baseURL: `${CONFIG.API_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const instance = axios.create(axiosConfig);

let refreshPromise;

class RefreshTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}

initiateTokensInterceptors(instance);

const sendRefreshTokenRequest = async (refreshToken) => instance.post('/auth/refresh/', { [REFRESH]: refreshToken });

const refreshTokens = async () => {
  const refreshToken = await storage.get(REFRESH);
  const saltedRefreshToken = isEmpty(refreshToken) ? '' : saltString(refreshToken, false);

  if (!saltedRefreshToken) {
    throw new RefreshTokenError('Пользователь не авторизован');
  }

  try {
    refreshPromise = refreshPromise || sendRefreshTokenRequest(saltedRefreshToken);

    const refreshedTokens = await refreshPromise;

    storage.set(REFRESH, saltString(refreshedTokens?.refresh, true));
    storage.set(ACCESS, saltString(refreshedTokens?.access, true));
  } finally {
    refreshPromise = undefined;
  }
};

const handleRetryRequestErrors = (errorFromSecondRequest) => {
  const isRetryRequestUnauthorized = errorFromSecondRequest.response?.status === 401;
  const isRefreshTokenRequestFailed = errorFromSecondRequest instanceof RefreshTokenError;
  const isFailedToRefreshTokens = isRefreshTokenRequestFailed || isRetryRequestUnauthorized;

  if (isFailedToRefreshTokens) {
    logoutFn();
  }

  throw errorFromSecondRequest;
};

const retryRequest = async (originalReq) => {
  const retryRequestObject = { ...originalReq };

  retryRequestObject.isRetryAttempt = true;
  retryRequestObject.headers.Authorization = instance.defaults.headers.common.Authorization;

  const retryRequestResponse = await instance.request(retryRequestObject);

  return retryRequestResponse;
};

const handleResponseError = async (error) => {
  const { config: originalReq, response } = error;
  const isRefreshRequest = originalReq.url === '/auth/refresh/';
  const isLoginRequest = originalReq.url === '/auth/login/';
  const isSecondAttempt = originalReq.isRetryAttempt;
  const isOriginalRequestUnauthorized = response?.status === 401;

  if (isRefreshRequest || isLoginRequest || isSecondAttempt || !isOriginalRequestUnauthorized) {
    throw error;
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

function initiateTokensInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (requestConfig) => addAuthHeaderToRequest(requestConfig),
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => handleResponseError(error),
  );
}

export { instance as axios };