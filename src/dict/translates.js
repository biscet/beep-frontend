import { ru } from './langs/ru';
import { en } from './langs/en';

export const LANG_FIELD = 'lang';

export const LANGUAGES = {
  RU: 'ru',
  EN: 'en',
};

export const LANGUAGES_NAMES = {
  [LANGUAGES.RU]: 'Русский',
  [LANGUAGES.EN]: 'English',
};

export const LANGUAGES_NAMES_ABRV = {
  [LANGUAGES.RU]: 'РУС',
  [LANGUAGES.EN]: 'ENG',
};

export const crossLang = LANGUAGES.RU;

export const dictI18n = { [LANGUAGES.RU]: ru, [LANGUAGES.EN]: en };