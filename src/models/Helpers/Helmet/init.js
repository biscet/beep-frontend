import { sample } from 'effector';
import { HELMET_FIELDS } from 'src/dict/fields/models/app';
import { HELMET_DICT, HELMET_ROUTES } from 'src/dict/helmet';
import { $pathnameUrl } from 'src/models/App';
import { spread } from 'patronum';
import { $helmetDescription, $helmetKeywords, $helmetTitle } from '.';

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
