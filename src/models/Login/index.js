import { combine } from 'effector';
import { PAGES_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl, allDomain } from 'src/models/App';
import { createForm } from 'effector-forms';
import { rules } from 'src/lib/rules';
import { LOGIN_FIELDS } from 'src/dict/fields/models/login';
import { isEmpty } from 'src/lib/lodash';

export const loginDomain = allDomain.createDomain('Login');

export const $isLoginPage = combine($pathnameUrl,
  (path) => isCurrentPath(path, PAGES_PATH.LOGIN));

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