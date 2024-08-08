import { crossLang, LANG_FIELD, LANGUAGES } from 'src/dict/translates';
import { THEMES } from 'src/dict/theme';
import { crossPagination, PAGINATION_FIELDS } from 'src/dict/pagination';
import { DEFAULT_CHUNK_SIZE } from 'src/dict/fields/models/projects';
import {
  get, isArray, isEmpty, strTrim,
} from './lodash';
import { storage } from './storage';

export const getPagination = () => (
  isEmpty(storage.get(PAGINATION_FIELDS.STORAGE)) ? crossPagination : storage.get(PAGINATION_FIELDS.STORAGE)
);

export const getBrowserTheme = (matches) => {
  const windowMatches = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isEmpty(matches) ? windowMatches : matches;
};

export const getLang = (language) => {
  const windowLanguage = get(window, 'navigator.languages.0', 'ru');
  return ['ru-RU', 'ru'].includes(isEmpty(language) ? windowLanguage : language)
    ? LANGUAGES.RU : LANGUAGES.EN;
};

export const getTheme = () => (getBrowserTheme() ? THEMES.DARK : THEMES.LIGHT);

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

const getValueLang = (value, param) => {
  if (!isEmpty(param)) {
    if (isArray(param)) {
      let str = '';
      param.forEach((val, index) => {
        const key = index + 1;
        str = isEmpty(str) ? value.replace(`{{value${key}}}`, val)
          : str.replace(`{{value${key}}}`, val);
      });
      return str;
    }
    return value.replace('{{value}}', param);
  }
  return value;
};

export const translate = ({ dictTranslates, lang }) => (value, param) => {
  if (isEmpty(lang) || isEmpty(value)) {
    return '';
  }

  if (lang === crossLang) {
    return getValueLang(value, param);
  }

  const val = `${strTrim(value.trim())}`;

  return isEmpty(dictTranslates[val])
    ? getValueLang(value, param) : getValueLang(dictTranslates[val], param);
};

export const getMediaDuration = (file) => new Promise((resolve) => {
  const url = URL.createObjectURL(file);
  const mediaElement = document.createElement(
    file.type.startsWith('video/') ? 'video' : 'audio',
  );

  mediaElement.src = url;
  mediaElement.addEventListener('loadedmetadata', () => {
    const { duration } = mediaElement;
    URL.revokeObjectURL(url);
    resolve(duration);
  });

  mediaElement.addEventListener('error', () => {
    URL.revokeObjectURL(url);
  });

  mediaElement.load();
});

export const createSlicedFile = (file, startChunk) => new File([file.slice(
  startChunk, Math.min(startChunk + DEFAULT_CHUNK_SIZE, file.size),
)], file.name, { type: file.type });

export const getFileExtension = (filename) => {
  const parts = filename.split('.');
  const ext = parts.pop();
  const name = parts.join('.');
  return { name, ext };
};

export const convertMinutesToHoursAndMinutes = (minutes) => {
  const totalMinutes = Math.floor(minutes);
  const remainingMinutes = Math.round((minutes - totalMinutes) * 60);

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60 + remainingMinutes;

  return { hours, mins };
};