import { combine } from 'effector';
import { PAGES_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl, allDomain } from 'src/models/App';
import { createForm } from 'effector-forms';
import { rules } from 'src/lib/rules';
import { LOGIN_FIELDS } from 'src/dict/fields/models/login';

export const loginDomain = allDomain.createDomain('Login');

export const $isLoginPage = combine($pathnameUrl,
  (path) => isCurrentPath(path, PAGES_PATH.LOGIN));

export const loginForm = createForm({
  fields: {
    [LOGIN_FIELDS.EMAIL]: {
      rules: [rules.required(), rules.email()],
      init: '',
      validateOn: ['blur'],
    },
    [LOGIN_FIELDS.PASSWORD]: {
      rules: [rules.required(), rules.password()],
      init: '',
      validateOn: ['blur'],
    },
  },
  validateOn: ['submit'],
  domain: loginDomain,
});