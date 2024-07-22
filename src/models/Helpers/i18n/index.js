import { combine } from 'effector';
import {
  get, isArray, isEmpty, strTrim,
} from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import {
  dictI18n, crossLang, LANG_FIELD,
} from 'src/dict/translates';
import { getLang } from 'src/lib/helpers';
import { allDomain } from 'src/models/App';

const i18nDomain = allDomain.createDomain('i18n');

export const getLangFn = i18nDomain.createEvent();
export const changeLangFn = i18nDomain.createEvent();

export const $lang = i18nDomain.createStore(getLang());

export const $translates = i18nDomain.createStore(dictI18n);

export const getLangFx = i18nDomain.createEffect(() => getLang());

export const changeLangFx = i18nDomain.createEffect((lang) => {
  storage.set(LANG_FIELD, lang);
  return lang;
});

export const $i18nCombineData = combine($lang, $translates,
  (lang, translates) => {
    let trans = {};
    if (!isEmpty(lang) && lang !== crossLang) {
      trans = Object.entries(get(translates, lang)).reduce((obj, [key, val]) => {
        const value = get(translates, `${crossLang}.${key}`);
        obj[`${strTrim(value.trim())}`] = val;
        return obj;
      }, {});
    }

    return ({
      dictTranslates: lang === crossLang ? get(translates, lang) : trans,
      lang,
    });
  });

const getValue = (value, param) => {
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
    return getValue(value, param);
  }

  const val = `${strTrim(value.trim())}`;

  return isEmpty(dictTranslates[val])
    ? getValue(value, param) : getValue(dictTranslates[val], param);
};
