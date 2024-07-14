import { combine } from 'effector';
import { PAGES_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';

export const $isLoginPage = combine($pathnameUrl,
  (path) => isCurrentPath(path, PAGES_PATH.LOGIN));