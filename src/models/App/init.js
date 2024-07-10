import { sample } from 'effector';
import { spread } from 'patronum/spread';
import { isEmpty } from 'src/lib/lodash';
import { HELMET_FIELDS } from 'src/dict/fields/app';
import { PAGES_PATH } from 'src/dict/path';
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
    const helmet = {
      [HELMET_FIELDS.TITLE]: '-',
      [HELMET_FIELDS.DESCRIPTION]: '-',
      [HELMET_FIELDS.KEYWORDS]: '-',
    };

    if (pathnameUrl.includes(PAGES_PATH.DEFAULT)) {
      helmet[HELMET_FIELDS.TITLE] = 'Beep - Default';
      helmet[HELMET_FIELDS.DESCRIPTION] = 'Beep Default Page';
      helmet[HELMET_FIELDS.KEYWORDS] = 'Beep,Video';
    }

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
