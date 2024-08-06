import {
  str, and, num, or, val,
} from '@withease/contracts';
import { storage } from 'src/lib/storage';
import { getLang, getTheme } from 'src/lib/helpers';
import { THEME_FIELD, THEMES } from 'src/dict/theme';
import { crossPagination, PAGINATION_FIELDS, PAGINATION_UNITS } from 'src/dict/pagination';
import { LANG_FIELD, LANGUAGES } from 'src/dict/translates';

export const themeContract = () => and(str, {
  isData: (data) => or(val(THEMES.DARK), val(THEMES.LIGHT)).isData(data),
  getErrorMessages: () => {
    storage.set(THEME_FIELD, getTheme());
    return 'The theme can only be "light" or "dark"';
  },
});

export const langContract = () => and(str, {
  isData: (data) => or(val(LANGUAGES.RU), val(LANGUAGES.EN)).isData(data),
  getErrorMessages: () => {
    storage.set(LANG_FIELD, getLang());
    return 'The language can only be "ru" or "en"';
  },
});

export const paginationContract = () => and(num, {
  isData: (data) => PAGINATION_UNITS.includes(data),
  getErrorMessages: () => {
    storage.set(PAGINATION_FIELDS.STORAGE, crossPagination);
    return 'Incorrect pagination value';
  },
});

export const fileContract = (file, sizeLimitInGb, fileType) => {
  const gbInBytes = 1024 * 1024 * 1024;

  const sizeContract = {
    isData: (data) => data.size <= sizeLimitInGb * gbInBytes,
  };

  const typeContract = {
    isData: (data) => !data.type.includes(fileType),
  };

  return or(sizeContract, typeContract).isData(file);
};
