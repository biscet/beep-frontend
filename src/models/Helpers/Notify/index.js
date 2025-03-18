import { NOTIFY_CONFIG, NOTIFY_FIELDS } from 'src/dict/notify';
import { isEmpty } from 'src/lib/lodash';
import { allDomain } from 'src/models/App';

const notifyDomain = allDomain.createDomain('Notify');

export const notifySuccessFn = notifyDomain.createEvent();
export const notifyErrorFn = notifyDomain.createEvent();
export const notifyWarningFn = notifyDomain.createEvent();

export const $enqueueSnackbar = notifyDomain.createStore(() => {});

export const sendSuccessFx = notifyDomain.createEffect(({
  [NOTIFY_FIELDS.CALLBACK]: notify,
  [NOTIFY_FIELDS.MESSAGE]: message,
  [NOTIFY_FIELDS.DATA]: data,
  [NOTIFY_FIELDS.TRANSLATE]: translateMessage,
}) => {
  notify.success(isEmpty(translateMessage) ? message : translateMessage, NOTIFY_CONFIG(data));
});

export const sendErrorFx = notifyDomain.createEffect(({
  [NOTIFY_FIELDS.CALLBACK]: notify,
  [NOTIFY_FIELDS.MESSAGE]: message,
  [NOTIFY_FIELDS.DATA]: data,
  [NOTIFY_FIELDS.TRANSLATE]: translateMessage,
}) => {
  notify.error(isEmpty(translateMessage) ? message : translateMessage, NOTIFY_CONFIG(data));
});

export const sendWarningFx = notifyDomain.createEffect(({
  [NOTIFY_FIELDS.CALLBACK]: notify,
  [NOTIFY_FIELDS.MESSAGE]: message,
  [NOTIFY_FIELDS.DATA]: data,
  [NOTIFY_FIELDS.TRANSLATE]: translateMessage,
}) => {
  notify.warn(isEmpty(translateMessage) ? message : translateMessage, NOTIFY_CONFIG(data));
});
