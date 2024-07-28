import { combine } from 'effector';
import { createForm } from 'effector-forms';
import { pending } from 'patronum';
import { authRegistrationSign } from 'src/api/registration';
import { REGISTRATION_FIELDS } from 'src/dict/fields/models/registration';
import { PAGES_PATH } from 'src/dict/path';
import { isEmpty } from 'src/lib/lodash';
import { rules } from 'src/lib/rules';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl, allDomain } from 'src/models/App';
import { authLoginFx } from '../Login';

const registrationDomain = allDomain.createDomain('Registration');

export const authRegistrationFx = registrationDomain.createEffect(authRegistrationSign);

export const $isRegistrationPage = combine($pathnameUrl,
  (path) => isCurrentPath(path, PAGES_PATH.REGISTRATION));

export const registrationForm = createForm({
  fields: {
    [REGISTRATION_FIELDS.EMAIL]: {
      rules: [rules.required(), rules.email()],
      init: '',
    },
    [REGISTRATION_FIELDS.USERNAME]: {
      rules: [rules.required(), rules.username()],
      init: '',
    },
    [REGISTRATION_FIELDS.PASSWORD]: {
      rules: [rules.required(), rules.password()],
      init: '',
    },
  },
  validateOn: ['submit'],
  domain: registrationDomain,
});

export const $disabledRegistrationCombineData = combine(registrationForm.$values, (values) => {
  const {
    [REGISTRATION_FIELDS.EMAIL]: email,
    [REGISTRATION_FIELDS.PASSWORD]: password,
    [REGISTRATION_FIELDS.USERNAME]: username,
  } = values;

  return [email, password, username].some((field) => isEmpty(field));
});

export const $registrationPending = pending({
  effects: [authRegistrationFx, authLoginFx],
});