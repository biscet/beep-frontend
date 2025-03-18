import { sample } from 'effector';
import { debounce } from 'patronum';
import { storage } from 'src/lib/storage';
import { TOKENS } from 'src/dict/config';
import { logoutFn } from 'src/models/Helpers/Logout';
import { get } from 'src/lib/lodash';
import { errorMsgHandler } from 'src/lib/url';
import { LOGIN_ERRORS, LOGIN_FIELDS } from 'src/dict/fields/models/login';
import { PAGES_PATH } from 'src/dict/path';
import { USER_CONFIRM_FIELDS, USER_RESEND_EMAIL_FIELDS } from 'src/dict/fields/models/user';
import {
  $isLoginPage, $tokenData, authLoginFx, goToLoginPageFn, loginForm,
} from '.';
import { notifyErrorFn, notifySuccessFn, notifyWarningFn } from '../Helpers/Notify';
import { pushHistoryFn } from '../Helpers/History';
import { resendConfirmCodeFn, userConfirmForm, userGetConfirmCodeFx } from '../User';
import { $pathnameUrl } from '../App';

$tokenData
  .reset(logoutFn)
  .on(authLoginFx.doneData, (_, result) => {
    const access = get(result, TOKENS.ACCESS, '').replace('Bearer ', '');
    const refresh = get(result, TOKENS.REFRESH, '').replace('Bearer ', '');

    storage.set(TOKENS.ACCESS, access);
    storage.set(TOKENS.REFRESH, refresh);

    return ({ accessToken: access, refreshToken: refresh });
  })
  .on(logoutFn, () => {
    storage.remove(TOKENS.ACCESS);
    storage.remove(TOKENS.REFRESH);

    return { accessToken: '', refreshToken: '' };
  });

sample({
  clock: debounce({
    source: $isLoginPage,
    timeout: 150,
  }),
  source: loginForm.$isDirty,
  filter: (isDirty, isLoginPage) => isDirty && isLoginPage === false,
  target: loginForm.reset,
});

sample({
  clock: debounce({
    source: $isLoginPage,
    timeout: 150,
  }),
  filter: (isLoginPage) => isLoginPage === false,
  target: userConfirmForm.reset,
});

sample({
  clock: loginForm.formValidated,
  source: loginForm.$values,
  target: authLoginFx,
});

sample({
  clock: authLoginFx.fail,
  filter: (error) => {
    const { msg } = errorMsgHandler(error);
    return msg !== 'User is not active. Please confirm your email.';
  },
  target: notifyErrorFn.prepend((error) => {
    let { msg } = errorMsgHandler(error);

    Object.keys(LOGIN_ERRORS).forEach((status) => {
      if (status === msg) {
        msg = LOGIN_ERRORS[msg];
      }
    });

    return msg;
  }),
});

sample({
  clock: authLoginFx.fail,
  source: loginForm.$values,
  filter: (_, error) => {
    const { msg } = errorMsgHandler(error);
    return msg === 'User is not active. Please confirm your email.';
  },
  target: [
    userConfirmForm.setForm.prepend((values) => ({
      [USER_CONFIRM_FIELDS.EMAIL]: get(values, LOGIN_FIELDS.EMAIL),
    })),
    userGetConfirmCodeFx.prepend((values) => ({
      [USER_RESEND_EMAIL_FIELDS.EMAIL]: get(values, LOGIN_FIELDS.EMAIL),
    })),
    notifyWarningFn.prepend(() => 'Пользователь не активен. Пожалуйста, подтвердите свой адрес электронной почты.'),
  ],
});

sample({
  clock: resendConfirmCodeFn,
  source: loginForm.$values,
  target: [
    userGetConfirmCodeFx.prepend((values) => ({
      [USER_RESEND_EMAIL_FIELDS.EMAIL]: get(values, LOGIN_FIELDS.EMAIL),
    })),
    notifySuccessFn.prepend(() => 'Код успешно выслан на вашу почту.'),
  ],
});

sample({
  clock: authLoginFx.doneData,
  fn: () => `/${PAGES_PATH.WEB}/`,
  target: $pathnameUrl,
});

sample({
  clock: goToLoginPageFn,
  target: pushHistoryFn.prepend(() => `/${PAGES_PATH.LOGIN}/`),
});