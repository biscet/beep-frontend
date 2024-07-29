import { sample } from 'effector';
import { spread } from 'patronum/spread';
import { isEmpty } from 'src/lib/lodash';
import { debounce } from 'patronum';
import {
  AppGate, RouteGate, $pathnameUrl, $pathParams,
  $fullyLoadApplication,
  setLoadAppliactionStateFn,
} from './index';
import { $enqueueSnackbar } from '../Helpers/Notify';
import { $history } from '../Helpers/History';

sample({
  clock: AppGate.state,
  target: spread({
    targets: {
      pathname: $pathnameUrl,
      pathParams: $pathParams,
      enqueueSnackbar: $enqueueSnackbar,
    },
  }),
});

sample({
  clock: RouteGate.state,
  filter: ({ pathname }) => !isEmpty(pathname),
  target: spread({
    targets: {
      pathname: $pathnameUrl,
      pathParams: $pathParams,
      history: $history,
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