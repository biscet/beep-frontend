import { sample } from 'effector';
import { spread } from 'patronum/spread';
import { debounce } from 'patronum';
import { isCurrentPath } from 'src/lib/url';
import { PAGES_PATH } from 'src/dict/path';
import { isEmpty } from 'src/lib/lodash';
import { TOKENS } from 'src/dict/config';
import { storage } from 'src/lib/storage';
import {
  AppGate, $pathnameUrl, $pathParams,
  $fullyLoadApplication,
  setLoadAppliactionStateFn,
  $initGateCombineData,
  RouteGate,
  $initApp,
} from './index';
import { $enqueueSnackbar } from '../Helpers/Notify';
import { $history } from '../Helpers/History';

sample({
  clock: AppGate.state,
  fn: (state) => {
    const condition = isCurrentPath(state.pathname, PAGES_PATH.WEB)
      || !isEmpty(storage.get(TOKENS.ACCESS))
      || !isEmpty(storage.get(TOKENS.REFRESH));

    return ({
      ...state,
      pathname: condition ? `/${PAGES_PATH.WEB}/` : state.pathname,
    });
  },
  target: spread({
    targets: {
      pathname: $pathnameUrl,
      pathParams: $pathParams,
      enqueueSnackbar: $enqueueSnackbar,
    },
  }),
});

sample({
  clock: $initGateCombineData,
  filter: ({ pathname, initApp }) => initApp && !isEmpty(pathname),
  target: spread({
    targets: {
      pathname: $pathnameUrl,
      pathParams: $pathParams,
      history: $history,
    },
  }),
});

sample({
  clock: RouteGate.state,
  filter: ({ pathname }) => !isEmpty(pathname),
  fn: (state) => ({ ...state, initApp: false }),
  target: spread({
    targets: {
      pathname: $pathnameUrl,
      pathParams: $pathParams,
      history: $history,
      initApp: $initApp,
    },
  }),
});

sample({
  clock: debounce({
    source: setLoadAppliactionStateFn,
    timeout: 100,
  }),
  target: $fullyLoadApplication,
});

sample({
  clock: $fullyLoadApplication,
  filter: (loaded) => loaded,
  fn: () => {
    const loaderAppContainer = document.getElementById('loader-application');
    if (loaderAppContainer) {
      loaderAppContainer.remove();
    }
  },
});