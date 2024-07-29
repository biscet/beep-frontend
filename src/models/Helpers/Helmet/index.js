import { combine } from 'effector';
import { HELMET_FIELDS } from 'src/dict/fields/models/app';
import { allDomain } from 'src/models/App';

const helmetDomain = allDomain.createDomain('Helmet');

export const $helmetTitle = helmetDomain.createStore('');
export const $helmetDescription = helmetDomain.createStore('');
export const $helmetKeywords = helmetDomain.createStore('');

export const $helmetCombineData = combine(
  $helmetTitle, $helmetDescription, $helmetKeywords,
  (helmetTitle, helmetDescription, helmetKeywords) => ({
    [HELMET_FIELDS.TITLE]: helmetTitle,
    [HELMET_FIELDS.DESCRIPTION]: helmetDescription,
    [HELMET_FIELDS.KEYWORDS]: helmetKeywords,
  }),
);