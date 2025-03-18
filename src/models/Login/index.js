import { combine } from 'effector';
import { PAGES_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl, allDomain } from 'src/models/App';
import { createForm } from 'effector-forms';
import { rules } from 'src/lib/rules';
import { LOGIN_FIELDS } from 'src/dict/fields/models/login';
import { isEmpty } from 'src/lib/lodash';
import { TOKENS } from 'src/dict/config';
import { storage } from 'src/lib/storage';
import { authLoginSign, getUserInfoSign } from 'src/api/login';

const loginDomain = allDomain.createDomain('Login');

export const goToLoginPageFn = loginDomain.createEvent();

export const $tokenData = loginDomain.createStore({
  accessToken: storage.get(TOKENS.ACCESS),
  refreshToken: storage.get(TOKENS.REFRESH),
});

export const authLoginFx = loginDomain.createEffect(authLoginSign);
export const getUserInfoFx = loginDomain.createEffect(getUserInfoSign);

export const $isAuthenticated = combine($tokenData, (
  ({ accessToken, refreshToken }) => (
    !isEmpty(accessToken) || !isEmpty(refreshToken)
  )));

export const $isLoginPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, PAGES_PATH.LOGIN),
);

export const loginForm = createForm({
  fields: {
    [LOGIN_FIELDS.EMAIL]: {
      rules: [rules.required()],
      init: '',
    },
    [LOGIN_FIELDS.PASSWORD]: {
      rules: [rules.required(), rules.password()],
      init: '',
    },
  },
  validateOn: ['submit'],
  domain: loginDomain,
});

export const $disabledLoginCombineData = combine(loginForm.$values, (values) => {
  const {
    [LOGIN_FIELDS.EMAIL]: email,
    [LOGIN_FIELDS.PASSWORD]: password,
  } = values;

  return [email, password].some((field) => isEmpty(field));
});
