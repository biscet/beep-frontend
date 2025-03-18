export const htmlContainer = document.getElementsByTagName('html')[0];

export const rootContainer = document.getElementById('root');

export const webLoaderContainer = document.getElementById('loader-web-page');

export const MOUSE_PARALLAX_CONTAINER_STYLE = { overflow: 'none' };

export const CONFIG = {
  PROCESSUNG_API_URL: `${import.meta.env.FARM_GATEWAY_HOST}/api/v1/processing`,
  PROJECTS_API_URL: `${import.meta.env.FARM_GATEWAY_HOST}/api/v1/projects`,
  USERS_API_URL: `${import.meta.env.FARM_GATEWAY_HOST}/api/v1/users`,
  STREAMS_API_URL: `${import.meta.env.FARM_GATEWAY_HOST}/api/v1/streams/sse`,
  SITEMAP_URL: import.meta.env.FARM_SITEMAP_HOST,
};

export const TOKENS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
};

export const DEFAULT_ERROR_MSG = 'Что-то пошло не так. Повторите попытку позже.';

export const DEFAULT_DIGITS_FOR_CONFIRM_USER = 6;