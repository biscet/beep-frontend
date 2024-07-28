import { sample } from 'effector';
import { debounce } from 'patronum';
import { storage } from 'src/lib/storage';
import { TOKENS } from 'src/dict/config';
import { logoutFn } from 'src/models/User';
import { get } from 'src/lib/lodash';
import { errorMsgHandler } from 'src/lib/url';
import { LOGIN_ERRORS } from 'src/dict/fields/models/login';
import {
  $isLoginPage, $tokenData, authLoginFx, loginForm,
} from '.';
import { notifyErrorFn } from '../Helpers/Notify';

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
  clock: loginForm.formValidated,
  source: loginForm.$values,
  target: authLoginFx,
});

sample({
  clock: authLoginFx.fail,
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
