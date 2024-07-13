import { combine, createDomain } from 'effector';
import { createGate } from 'effector-react';
import { HELMET_FIELDS } from 'src/dict/fields/app';

export const AppGate = createGate('App');
export const RouteGate = createGate('Route');

export const allDomain = createDomain('App');
export const settingsDomain = allDomain.createDomain('Settings');

export const setLoadAppliactionStateFn = settingsDomain.createEvent();

export const setHeaderAnimationStateFn = settingsDomain.createEvent();

export const $fullyLoadApplication = settingsDomain.createStore(false);

export const $headerAnimationComplete = settingsDomain.createStore(false);

export const $pathnameUrl = settingsDomain.createStore('');
export const $pathParams = settingsDomain.createStore('');

export const $helmetTitle = settingsDomain.createStore('');
export const $helmetDescription = settingsDomain.createStore('');
export const $helmetKeywords = settingsDomain.createStore('');

export const $helmetDataCombine = combine(
  $helmetTitle, $helmetDescription, $helmetKeywords,
  (helmetTitle, helmetDescription, helmetKeywords) => ({
    [HELMET_FIELDS.TITLE]: helmetTitle,
    [HELMET_FIELDS.DESCRIPTION]: helmetDescription,
    [HELMET_FIELDS.KEYWORDS]: helmetKeywords,
  }),
);