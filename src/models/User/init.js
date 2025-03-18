import { sample, split } from 'effector';
import { get, isEmpty } from 'src/lib/lodash';
import {
  DEFAULT_RESEND_CODE,
  USER_BACKEND_FIELDS, USER_CONFIRM_ERRORS, USER_CONFIRM_FIELDS, USER_FIELDS,
  USER_RESEND_EMAIL_FIELDS,
} from 'src/dict/fields/models/user';
import { debounce, spread } from 'patronum';
import { yandexContainerErrorContract } from 'src/lib/contracts';
import { errorMsgHandler } from 'src/lib/url';
import { EVENT_STREAM_BALANCE_FIELDS } from 'src/dict/fields/models/sse';
import { $isWebPage } from '../Web';
import { getUserInfoFx, loginForm } from '../Login';
import {
  $userAvatar, $userEmail, $userName, refreshUserDataFn,
  userConfirmForm, $secondsToResendEmailCode, userGetConfirmCodeFx,
  userConfirmFx, resetConfirmCodeFn,
  $userId, $balances, changeBalancesFn,
} from '.';
import { $initApp } from '../App';
import { logoutFn } from '../Helpers/Logout';
import { notifyErrorFn } from '../Helpers/Notify';

const {
  EMAIL, USERNAME, AVATAR, LOADED, ID, BALANCE, FROZEN_BALANCE,
} = USER_FIELDS;

$secondsToResendEmailCode
  .reset(userConfirmForm.reset)
  .on(resetConfirmCodeFn, () => 0)
  .on(userGetConfirmCodeFx.fail, (_, data) => (
    get(data, `error.response.data.${USER_RESEND_EMAIL_FIELDS.SECONDS}`, DEFAULT_RESEND_CODE)
  ))
  .on(userGetConfirmCodeFx.doneData, (_, data) => (
    get(data, USER_RESEND_EMAIL_FIELDS.SECONDS, DEFAULT_RESEND_CODE)
  ));

$balances
  .on(changeBalancesFn, (prevBalances, newBlances) => {
    const balances = { ...prevBalances };

    const newBalance = get(newBlances, EVENT_STREAM_BALANCE_FIELDS.BALANCE, null);
    const newFreezBalance = get(newBlances, EVENT_STREAM_BALANCE_FIELDS.FROZEN_BALANCE, null);

    if (!isEmpty(newBalance)) {
      balances[BALANCE] = newBalance;
    }

    if (!isEmpty(newFreezBalance)) {
      balances[FROZEN_BALANCE] = newFreezBalance;
    }

    return balances;
  });

sample({
  clock: $isWebPage,
  filter: $isWebPage,
  target: getUserInfoFx,
});

sample({
  clock: getUserInfoFx.doneData,
  fn: (data) => {
    const userEmail = get(data, USER_BACKEND_FIELDS.EMAIL, '-');
    const userName = get(data, USER_BACKEND_FIELDS.USERNAME, '-');
    const userId = get(data, USER_BACKEND_FIELDS.ID, '');
    const balance = get(data, USER_BACKEND_FIELDS.BALANCE, '');
    const freezonBalance = get(data, USER_BACKEND_FIELDS.FROZEN_BALANCE, '');

    return ({
      [EMAIL]: userEmail,
      [USERNAME]: userName,
      [ID]: userId,
      [AVATAR]: !isEmpty(userName) ? userName[0].toUpperCase() : '-',
      [LOADED]: true,
      [BALANCE]: {
        [BALANCE]: balance,
        [FROZEN_BALANCE]: freezonBalance,
      },
    });
  },
  target: spread({
    targets: {
      [EMAIL]: $userEmail,
      [USERNAME]: $userName,
      [AVATAR]: $userAvatar,
      [LOADED]: $initApp,
      [ID]: $userId,
      [BALANCE]: $balances,
    },
  }),
});

split({
  source: getUserInfoFx.fail,
  match: {
    retry: (data) => yandexContainerErrorContract(data),
  },
  cases: {
    retry: refreshUserDataFn,
    __: logoutFn,
  },
});

sample({
  clock: userConfirmForm.formValidated,
  source: userConfirmForm.$values,
  fn: (values) => ({
    ...values,
    [USER_CONFIRM_FIELDS.CODE]: values[USER_CONFIRM_FIELDS.CODE].join(''),
  }),
  target: userConfirmFx,
});

sample({
  clock: userConfirmFx.doneData,
  target: loginForm.submit,
});

sample({
  clock: userConfirmFx.fail,
  target: notifyErrorFn.prepend((error) => {
    let { msg } = errorMsgHandler(error);

    Object.keys(USER_CONFIRM_ERRORS).forEach((status) => {
      if (status === msg) {
        msg = USER_CONFIRM_ERRORS[msg];
      }
    });

    return msg;
  }),
});

sample({
  clock: debounce({ source: refreshUserDataFn, timeout: 500 }),
  target: getUserInfoFx,
});