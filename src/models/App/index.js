import { combine, createDomain } from 'effector';
import { createGate } from 'effector-react';
import { isEmpty } from 'src/lib/lodash';
import { uuidPattern } from 'src/lib/rules';

export const AppGate = createGate('App');
export const RouteGate = createGate('Route');
export const WebGate = createGate('Web');

export const allDomain = createDomain('App');
export const settingsDomain = allDomain.createDomain('Settings');

export const setLoadAppliactionStateFn = settingsDomain.createEvent();

export const $initApp = settingsDomain.createStore(false);

export const $fullyLoadApplication = settingsDomain.createStore(false);

export const $pathParams = settingsDomain.createStore('');
export const $pathnameUrl = settingsDomain.createStore('');
export const $pathnameUUID = $pathnameUrl.map((path) => {
  const uuid = (isEmpty(path) ? window.location.href : path).match(uuidPattern);
  return isEmpty(uuid) ? '' : uuid[0];
});

export const $initGateCombineData = combine(
  $initApp, WebGate.state,
  (initApp, state) => ({ ...state, initApp }),
);

$pathnameUrl.watch(console.log);