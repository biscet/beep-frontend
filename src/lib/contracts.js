import {
  str, and, num, or, val, obj,
} from '@withease/contracts';
import { storage } from 'src/lib/storage';
import { getLang, getTheme } from 'src/lib/helpers';
import { THEME_FIELD, THEMES } from 'src/dict/theme';
import { crossPagination, PAGINATION_FIELDS, PAGINATION_UNITS } from 'src/dict/pagination';
import { LANG_FIELD, LANGUAGES } from 'src/dict/translates';
import {
  BACKEND_PROJECT_STATUS_FIELDS, CHUNK_UPLOAD_FIELDS,
  COMPLETE_UPLOAD_CHUNKS_FIELDS, crossPlayerVolume, PLAYER_VOLUME_FIELD,
  PROJECT_FIELDS,
} from 'src/dict/fields/models/projects';
import { crossCatalogType, TYPE_CATALOG_FIELD, TYPES_CATALOG_FIELDS } from 'src/dict/header-catalog';
import { get, isEmpty } from './lodash';

const { CREATED, DONE } = BACKEND_PROJECT_STATUS_FIELDS;

export const themeContract = () => and(str, {
  isData: (data) => or(val(THEMES.DARK), val(THEMES.LIGHT)).isData(data),
  getErrorMessages: () => {
    storage.set(THEME_FIELD, getTheme());
    return 'The theme can only be "light" or "dark"';
  },
});

export const typeCatalogContract = () => and(str, {
  isData: (data) => or(val(TYPES_CATALOG_FIELDS.ROW), val(TYPES_CATALOG_FIELDS.COLUMN)).isData(data),
  getErrorMessages: () => {
    storage.set(TYPE_CATALOG_FIELD, crossCatalogType);
    return 'The catalog type can only be "row" or "column"';
  },
});

export const playerVolumeContract = () => and(num, {
  isData: (data) => data >= 0 && data <= 100,
  getErrorMessages: () => {
    storage.set(PLAYER_VOLUME_FIELD, crossPlayerVolume);
    return 'Volume can be from 0 to 100';
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
  [CHUNK_UPLOAD_FIELDS.USER_ID]: str,
  [CHUNK_UPLOAD_FIELDS.ETAGS]: str,
}).isData(data);

export const validProjectContract = (data) => !obj({
  [PROJECT_FIELDS.PROJECT]: obj({
    [PROJECT_FIELDS.NAME]: str,
    [PROJECT_FIELDS.ID]: str,
  }),
}).isData(data);

export const yandexContainerErrorContract = (data) => obj({
  error: obj({
    code: and(str, {
      isData: ({
        error: {
          code,
        },
      }) => code === 'ERR_BAD_RESPONSE',
    }),
  }),
}).isData(data);

export const canBeUploadPageContract = (states) => and(
  { isData: ({ page }) => page },
  { isData: ({ data }) => ![CREATED].includes(get(data, PROJECT_FIELDS.STATUS, '')) },
).isData(states);

export const canBeContentPageContract = (states) => and(
  { isData: ({ page }) => page },
  { isData: ({ data }) => ![DONE].includes(get(data, PROJECT_FIELDS.STATUS, '')) },
).isData(states);

export const completeChunksUploadContract = (data) => obj({
  [COMPLETE_UPLOAD_CHUNKS_FIELDS.FILE_KEY]: str,
}).isData(data);