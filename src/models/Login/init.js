import { sample } from 'effector';
import { debounce } from 'patronum';
import { storage } from 'src/lib/storage';
import { TOKENS } from 'src/dict/config';
import { logoutFn } from 'src/models/User';
import { get } from 'src/lib/lodash';
import {
  $isLoginPage, $tokenData, authLoginFx, loginForm,
} from '.';
import { notifyErrorFn } from '../Helpers/Notify';

$tokenData
  .reset(logoutFn)
  .on(authLoginFx.doneData, (_, result) => {
    const access = get(result, TOKENS.ACCESS, '');
    const refresh = get(result, TOKENS.REFRESH, '');

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
  target: authLoginFx,
});

sample({
  clock: authLoginFx.fail,
  target: notifyErrorFn.prepend(() => 'Что-то пошло не так. Повторите попытку позже.'),
});