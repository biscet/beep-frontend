import {
  combine, createEvent, sample, split,
} from 'effector';
import { PAGES_PATH, ROUTES_FIELDS, WEB_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { debounce } from 'patronum';
import { isArray } from 'src/lib/lodash';
import { createFactory } from '@withease/factories';
import { $pathnameUrl, allDomain } from '../App';

const { PATH, ACTIVE } = ROUTES_FIELDS;

export const webDomain = allDomain.createDomain('Web');

export const goToWebPageFn = webDomain.createEvent();

export const $itemsRoutesWeb = combine(() => [
  {
    [PATH]: WEB_PATH.PRESETS,
    [ACTIVE]: false,
  },
  {
    [PATH]: WEB_PATH.PROJECTS,
    [ACTIVE]: true,
  },
  {
    [PATH]: WEB_PATH.PAYMENT,
    [ACTIVE]: true,
  },
].filter(({ [ACTIVE]: active }) => active));

export const $isWebPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, PAGES_PATH.WEB),
);

export const crudStoreBehaviorPageFb = createFactory(
  ({ $page, isPageLogic, isNotPageLogic }) => {
    const isNotPageFn = createEvent();

    split({
      source: $page,
      match: {
        isPage: (trigger) => (isArray(trigger) ? trigger[0] : trigger),
        isNotPage: (trigger) => (isArray(trigger) ? !trigger[0] : !trigger),
      },
      cases: {
        isPage: isPageLogic,
        isNotPage: isNotPageFn,
      },
    });

    sample({
      clock: debounce({ source: isNotPageFn, timeout: 150 }),
      target: isNotPageLogic,
    });
  },
);