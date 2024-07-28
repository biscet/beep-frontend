export const htmlContainer = document.getElementsByTagName('html')[0];

export const rootContainer = document.getElementById('root');

export const webLoaderContainer = document.getElementById('loader-web-page');

export const MOUSE_PARALLAX_CONTAINER_STYLE = { overflow: 'none' };

export const CONFIG = {
  API_URL: import.meta.env.FARM_BACKEND_API,
};

export const TOKENS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
};

export const DEFAULT_ERROR_MSG = 'Что-то пошло не так. Повторите попытку позже.';