import { sample } from 'effector';
import { PAGES_PATH, WEB_PATH } from 'src/dict/path';
// import { webLoaderContainer } from 'src/dict/config';
import { goToWebPageFn } from '.';
import { pushHistoryFn } from '../Helpers/History';
// import { $pathnameUrl } from '../App';
// import { $isLoginPage } from '../Login';
// import { $isRegistrationPage } from '../Registration';

sample({
  clock: goToWebPageFn,
  target: pushHistoryFn.prepend(() => `/${PAGES_PATH.WEB}/${WEB_PATH.DASHBOARD}`),
});

// sample({
//   clock: $pathnameUrl,
//   source: [$isLoginPage, $isRegistrationPage],
//   filter: ([isLoginPage, isRegistrationPage]) => isLoginPage || isRegistrationPage,
//   fn: () => {
//     webLoaderContainer.style.display = 'flex';

//     setTimeout(() => {
//       webLoaderContainer.style.display = 'none';
//     }, 150);

//     return true;
//   },
//   target: goToWebPageFn,
// });