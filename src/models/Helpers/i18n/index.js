import { combine } from 'effector';
import { get, isEmpty, strTrim } from 'src/lib/lodash';
import { persist } from 'effector-storage/local';
import { dictI18n, crossLang, LANG_FIELD } from 'src/dict/translates';
import { allDomain, AppGate } from 'src/models/App';
import { langContract } from 'src/lib/contracts';
import { trackPreferredLanguages } from '@withease/web-api';

const { $language: $webApiLanguage } = trackPreferredLanguages({ setup: AppGate.open });
export { $webApiLanguage };

const i18nDomain = allDomain.createDomain('i18n');

export const changeLangFn = i18nDomain.createEvent();

export const $lang = i18nDomain.createStore(crossLang, { name: LANG_FIELD });

export const $translates = i18nDomain.createStore(dictI18n);

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

persist({ store: $lang, key: LANG_FIELD, contract: langContract() });
