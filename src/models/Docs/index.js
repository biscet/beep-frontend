import { isCurrentPath } from 'src/lib/url';
import { PAGES_PATH } from 'src/dict/path';
import { $pathnameUrl, allDomain } from '../App';

const { OFFER, PRIVACY } = PAGES_PATH;

export const docsDomain = allDomain.createDomain('Docs');

export const $isDocsPage = $pathnameUrl.map(
  () => [OFFER, PRIVACY].some(
    (pagePath) => isCurrentPath(window.location.pathname, pagePath),
  ),
);
