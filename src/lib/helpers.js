import { crossLang, LANG_FIELD } from 'src/dict/translates';
import { crossTheme, THEME_FIELD } from 'src/dict/theme';
import { crossPagination, PAGINATION_FIELD } from 'src/dict/pagination';
import { isEmpty } from './lodash';
import { storage } from './storage';

export const getLang = () => (isEmpty(storage.get(LANG_FIELD)) ? crossLang : storage.get(LANG_FIELD));

export const getPagination = () => (
  isEmpty(storage.get(PAGINATION_FIELD.STORAGE)) ? crossPagination : storage.get(PAGINATION_FIELD.STORAGE)
);

export const getTheme = () => (isEmpty(storage.get(THEME_FIELD)) ? crossTheme : storage.get(THEME_FIELD));

export const getBrowserTheme = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

export const prependFn = (fn, state) => { fn(state); };

export const prependObstacleFn = (fn, state) => () => { fn(state); };

export const formatFileSize = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex += 1;
  }

  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
};