import { combine } from 'effector';
import { USER_CONFIRM_FIELDS, USER_FIELDS } from 'src/dict/fields/models/user';
import { createForm } from 'effector-forms';
import { rules } from 'src/lib/rules';
import {
  userConfirmSign, userResendEmailSign,
} from 'src/api/user';
import { isEmpty } from 'src/lib/lodash';
import { DEFAULT_DIGITS_FOR_CONFIRM_USER } from 'src/dict/config';
import { allDomain } from '../App';

const {
  EMAIL, USERNAME, AVATAR, BALANCE, FROZEN_BALANCE,
} = USER_FIELDS;

const userDomain = allDomain.createDomain('User');

export const refreshUserDataFn = userDomain.createEvent();
export const resendConfirmCodeFn = userDomain.createEvent();
export const resetConfirmCodeFn = userDomain.createEvent();

export const changeBalancesFn = userDomain.createEvent();

export const $userName = userDomain.createStore('-');
export const $userEmail = userDomain.createStore('-');
export const $userAvatar = userDomain.createStore('-');
export const $userId = userDomain.createStore('');

export const $secondsToResendEmailCode = userDomain.createStore(-1);

export const $balances = userDomain.createStore({
  [BALANCE]: 0,
  [FROZEN_BALANCE]: 0,
});

export const userConfirmFx = userDomain.createEffect(userConfirmSign);
export const userGetConfirmCodeFx = userDomain.createEffect(userResendEmailSign);

export const $userCombineData = combine(
  $userName, $userEmail, $userAvatar,
  (userName, userEmail, userAvatar) => ({
    [EMAIL]: userEmail,
    [AVATAR]: userAvatar,
    [USERNAME]: userName,
  }),
);

export const userConfirmForm = createForm({
  fields: {
    [USER_CONFIRM_FIELDS.EMAIL]: {
      rules: [rules.required(), rules.email()],
      init: '',
    },
    [USER_CONFIRM_FIELDS.CODE]: {
      rules: [rules.required(), rules.confirmCode(DEFAULT_DIGITS_FOR_CONFIRM_USER)],
      init: Array.from({ length: DEFAULT_DIGITS_FOR_CONFIRM_USER }, () => ''),
    },
  },
  validateOn: ['submit'],
  domain: userDomain,
});

export const $isConfirmEmail = userConfirmForm.fields[USER_CONFIRM_FIELDS.EMAIL].$value.map(
  (email) => !isEmpty(email),
);

export const $disabledUserConfirmCombineData = combine(userConfirmForm.$values, (values) => {
  const {
    [USER_CONFIRM_FIELDS.EMAIL]: email,
    [USER_CONFIRM_FIELDS.CODE]: code,
  } = values;

  return !isEmpty(email) && code.join('').length !== DEFAULT_DIGITS_FOR_CONFIRM_USER;
});
