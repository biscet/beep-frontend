/* eslint-disable no-plusplus */
import { crossLang, LANGUAGES } from 'src/dict/translates';
import { THEMES } from 'src/dict/theme';
import { crossPagination, PAGINATION_FIELDS } from 'src/dict/pagination';
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

export const prependFn = (fn, state) => () => { fn(state); };

export const prependObstacleFn = (fn, state) => () => { fn(state); };

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

export const progressFillStyle = (uploadProgress) => ({ transform: `translateX(-${100 - uploadProgress}%)` });

export const imageStyle = (url) => (isEmpty(url) ? null : { backgroundImage: `url('${url}')` });

export const mergeBlurTimestamps = (timestamps, threshold = 500) => {
  const mergedTimestamps = [];
  let currentGroup = [timestamps[0]];

  for (let i = 1; i < timestamps.length; i++) {
    const prevTimestamp = timestamps[i - 1];
    const currentTimestamp = timestamps[i];

    if (currentTimestamp.start_time - prevTimestamp.end_time <= threshold) {
      currentGroup.push(currentTimestamp);
    } else {
      mergedTimestamps.push(currentGroup);
      currentGroup = [currentTimestamp];
    }
  }

  mergedTimestamps.push(currentGroup);

  return mergedTimestamps;
};
