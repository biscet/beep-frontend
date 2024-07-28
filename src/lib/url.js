import { DEFAULT_ERROR_MSG } from 'src/dict/config';
import { get } from './lodash';

export const isCurrentPath = (path, value = '') => {
  const arrPath = path.split('/');
  return arrPath.includes(value);
};

export const isCurrentPathForBreadCrumb = (path, value = '') => path.includes(value);

export const errorMsgHandler = (error) => get(
  error,
  'error.response.data',
  { msg: DEFAULT_ERROR_MSG },
);