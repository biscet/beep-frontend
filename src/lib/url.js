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