import { HELMET_FIELDS } from './fields/app';
import { PAGES_PATH } from './path';

const { DEFAULT } = PAGES_PATH;

export const HELMET_ROUTES = [DEFAULT];

export const HELMET_DICT = {
  [DEFAULT]: {
    [HELMET_FIELDS.TITLE]: 'Beep - Default',
    [HELMET_FIELDS.DESCRIPTION]: 'Beep Default Page',
    [HELMET_FIELDS.KEYWORDS]: 'Beep,Video',
  },
};