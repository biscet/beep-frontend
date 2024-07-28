import { combine } from 'effector';
import { PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl, allDomain } from '../App';

export const webDomain = allDomain.createDomain('Web');

export const goToWebPageFn = webDomain.createEvent();

export const $itemsRoutesWeb = combine(() => [
  {
    path: WEB_PATH.DASHBOARD,
    active: true,
  },
].filter(({ active }) => active));

export const $isWebPage = combine($pathnameUrl,
  (path) => isCurrentPath(path, PAGES_PATH.WEB));