import { combine, split } from 'effector';
import { PAGES_PATH, ROUTES_FIELDS, WEB_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { debounce } from 'patronum';
import { $pathnameUrl, allDomain } from '../App';

const { PATH, ACTIVE } = ROUTES_FIELDS;

export const webDomain = allDomain.createDomain('Web');

export const goToWebPageFn = webDomain.createEvent();

export const $itemsRoutesWeb = combine(() => [
  {
    [PATH]: WEB_PATH.DASHBOARD,
    [ACTIVE]: false,
  },
  {
    [PATH]: WEB_PATH.PROJECTS,
    [ACTIVE]: true,
  },
].filter(({ [ACTIVE]: active }) => active));

export const $isWebPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, PAGES_PATH.WEB),
);

export const crudStoreBehaviorPageFb = ({ $page, isPageLogic, isNotPageLogic }) => {
  split({
    source: $page,
    match: {
      isPage: (page) => page,
      isNotPage: (page) => !page,
    },
    cases: {
      isPage: isPageLogic,
      isNotPage: debounce({
        source: isNotPageLogic,
        timeout: 150,
      }),
    },
  });
};