import { createDomain } from 'effector';
import { createGate } from 'effector-react';

export const AppGate = createGate('App');
export const RouteGate = createGate('Route');

export const allDomain = createDomain('App');
export const settingsDomain = allDomain.createDomain('Settings');

export const setLoadAppliactionStateFn = settingsDomain.createEvent();

export const $fullyLoadApplication = settingsDomain.createStore(false);

export const $pathnameUrl = settingsDomain.createStore('');
export const $pathParams = settingsDomain.createStore('');
