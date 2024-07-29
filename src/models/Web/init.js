import { sample } from 'effector';
import { PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { rootContainer } from 'src/dict/config';
import { $isWebPage, goToWebPageFn } from '.';
import { pushHistoryFn } from '../Helpers/History';
import { setHeaderAnimationStateFn } from '../Blocks';

sample({
  clock: goToWebPageFn,
  target: pushHistoryFn.prepend(() => `/${PAGES_PATH.WEB}/${WEB_PATH.DASHBOARD}`),
});

sample({
  clock: $isWebPage,
  fn: (_, isWebPage) => {
    rootContainer.style = isWebPage ? 'display: flex;' : null;
    return null;
  },
  target: setHeaderAnimationStateFn.prepend(() => true),
});