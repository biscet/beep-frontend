import { allDomain } from 'src/models/App';

const resizeDomain = allDomain.createDomain('Resize');

export const changeInnterSizesFn = resizeDomain.createEvent();

export const $innerSizes = resizeDomain.createStore(
  { width: window.innerWidth, height: window.innerHeight },
);
