import { crossLang, LANG_FIELD } from 'src/dict/translates';
import { crossTheme, THEME_FIELD } from 'src/dict/theme';
import { isEmpty } from './lodash';
import { storage } from './storage';

export const getLang = () => (isEmpty(storage.get(LANG_FIELD)) ? crossLang : storage.get(LANG_FIELD));

export const getTheme = () => (isEmpty(storage.get(THEME_FIELD)) ? crossTheme : storage.get(THEME_FIELD));

export const getBrowserTheme = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);