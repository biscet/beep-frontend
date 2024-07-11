import { sample } from 'effector';
import { spread } from 'patronum/spread';
import { isEmpty } from 'src/lib/lodash';
import { HELMET_FIELDS } from 'src/dict/fields/app';
import { PAGES_PATH } from 'src/dict/path';
import { HELMET_DICT, HELMET_ROUTES } from 'src/dict/helmet';
import {
  AppGate, RouteGate, $pathnameUrl, $pathParams,
  $helmetTitle,
  $helmetKeywords,
  $helmetDescription,
} from './index';

sample({
  clock: AppGate.state,
  target: spread({
    targets: {
      pathname: $pathnameUrl,
      pathParams: $pathParams,
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
    },
  }),
});

sample({
  clock: $pathnameUrl,
  fn: (pathnameUrl) => {
    let helmet = {
      [HELMET_FIELDS.TITLE]: '-',
      [HELMET_FIELDS.DESCRIPTION]: '-',
      [HELMET_FIELDS.KEYWORDS]: '-',
    };

    HELMET_ROUTES.forEach((route) => {
      if (pathnameUrl.includes(route)) {
        helmet = HELMET_DICT[route];
      }
    });

    return helmet;
  },
  target: spread({
    targets: {
      [HELMET_FIELDS.TITLE]: $helmetTitle,
      [HELMET_FIELDS.DESCRIPTION]: $helmetDescription,
      [HELMET_FIELDS.KEYWORDS]: $helmetKeywords,
    },
  }),
});
