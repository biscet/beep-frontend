import { DEFAULT_ERROR_MSG } from 'src/dict/config';
import { get, intersection, isArray } from './lodash';

export const isCurrentPath = (path, value = '') => {
  const arrPath = path.split('/');
  return isArray(value)
    ? intersection(value, arrPath).length === value.length
    : arrPath.includes(value);
};

export const errorMsgHandler = (error) => get(
  error,
  'error.response.data',
  { msg: DEFAULT_ERROR_MSG },
);

export const getQueryParam = (param) => {
  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(new URL(currentUrl).search);
  return urlParams.get(param);
};

export const getQueryParamFromUrl = (url, param) => {
  const urlParams = new URLSearchParams(url);
  return urlParams.get(param);
};

export const getAllQueryParamsFromUrl = () => {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  urlParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};
