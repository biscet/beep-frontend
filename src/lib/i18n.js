import { crossLang, LANG_FIELD } from 'src/dict/translates';
import { isEmpty } from './lodash';
import { storage } from './storage';

export const getLang = () => (isEmpty(storage.get(LANG_FIELD)) ? crossLang : storage.get(LANG_FIELD));