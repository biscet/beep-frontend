import { sample } from 'effector';
import { NOTIFY_FIELDS } from 'src/dict/notify';
import { get } from 'src/lib/lodash';
import { $lang, $translates } from 'src/models/Helpers/i18n';
import {
  notifySuccessFn, $enqueueSnackbar, sendSuccessFx, notifyErrorFn, sendErrorFx,
  notifyWarningFn,
  sendWarningFx,
} from '.';
import { $theme } from '../Theme';

sample({
  clock: notifySuccessFn,
  source: [$enqueueSnackbar, $theme, $translates, $lang],
  fn: ([notify, theme, translates, lang], message) => {
    const translateKey = Object.keys(get(translates, 'ru')).find((key) => get(translates, `ru.${key}`) === message);

    return ({
      [NOTIFY_FIELDS.CALLBACK]: notify,
      [NOTIFY_FIELDS.MESSAGE]: message,
      [NOTIFY_FIELDS.DATA]: {
        theme,
      },
      [NOTIFY_FIELDS.TRANSLATE]: get(translates, `${lang}.${translateKey}`),
    });
  },
  target: sendSuccessFx,
});

sample({
  clock: notifyErrorFn,
  source: [$enqueueSnackbar, $theme, $translates, $lang],
  fn: ([notify, theme, translates, lang], message) => {
    const translateKey = Object.keys(get(translates, 'ru')).find((key) => get(translates, `ru.${key}`) === message);

    return ({
      [NOTIFY_FIELDS.CALLBACK]: notify,
      [NOTIFY_FIELDS.MESSAGE]: message,
      [NOTIFY_FIELDS.DATA]: {
        theme,
      },
      [NOTIFY_FIELDS.TRANSLATE]: get(translates, `${lang}.${translateKey}`),
    });
  },
  target: sendErrorFx,
});

sample({
  clock: notifyWarningFn,
  source: [$enqueueSnackbar, $theme, $translates, $lang],
  fn: ([notify, theme, translates, lang], message) => {
    const translateKey = Object.keys(get(translates, 'ru')).find((key) => get(translates, `ru.${key}`) === message);

    return ({
      [NOTIFY_FIELDS.CALLBACK]: notify,
      [NOTIFY_FIELDS.MESSAGE]: message,
      [NOTIFY_FIELDS.DATA]: {
        theme,
      },
      [NOTIFY_FIELDS.TRANSLATE]: get(translates, `${lang}.${translateKey}`),
    });
  },
  target: sendWarningFx,
});
