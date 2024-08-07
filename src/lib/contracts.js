import {
  str, and, num, or, val, obj,
} from '@withease/contracts';
import { storage } from 'src/lib/storage';
import { getLang, getTheme } from 'src/lib/helpers';
import { THEME_FIELD, THEMES } from 'src/dict/theme';
import { crossPagination, PAGINATION_FIELDS, PAGINATION_UNITS } from 'src/dict/pagination';
import { LANG_FIELD, LANGUAGES } from 'src/dict/translates';
import { CHUNK_UPLOAD_FIELDS, ETAGS_FIELDS } from 'src/dict/fields/models/projects';
import { isEmpty } from './lodash';

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

export const rulesFileContract = (file, sizeLimitInGb, fileType) => {
  const gbInBytes = 1024 * 1024 * 1024;
  const sizeContract = { isData: (data) => data.size <= sizeLimitInGb * gbInBytes };
  const typeContract = { isData: (data) => !data.type.includes(fileType) };

  return or(sizeContract, typeContract).isData(file);
};

export const chunkUploadContract = (data) => {
  const uuidPattern = /[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}/i;

  const chunkContract = obj({
    [CHUNK_UPLOAD_FIELDS.FILE]: obj({
      size: and(num, { isData: (size) => size > 0 }),
    }),
    [CHUNK_UPLOAD_FIELDS.INDEX]: num,
    [CHUNK_UPLOAD_FIELDS.PROJECT_ID]: and(str, { isData: (id) => uuidPattern.test(id) }),
    [CHUNK_UPLOAD_FIELDS.NAME]: and(str, { isData: (name) => !isEmpty(name.trim()) }),
    [CHUNK_UPLOAD_FIELDS.EXT]: str,
  });

  return chunkContract.isData(data);
};

export const chunkUploadResponseContract = (data) => obj({
  [CHUNK_UPLOAD_FIELDS.STT_ID]: or(str, num),
  [CHUNK_UPLOAD_FIELDS.WAV_ID]: or(str, num),
  [CHUNK_UPLOAD_FIELDS.USER_ID]: or(str, num),
  [CHUNK_UPLOAD_FIELDS.ETAGS]: obj({
    [ETAGS_FIELDS.STT]: or(str, num),
    [ETAGS_FIELDS.USER]: or(str, num),
    [ETAGS_FIELDS.WAV]: or(str, num),
  }),
}).isData(data);
