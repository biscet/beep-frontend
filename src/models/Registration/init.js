import { sample } from 'effector';
import { debounce } from 'patronum';
import { errorMsgHandler } from 'src/lib/url';
import { REGISTRATION_ERRORS, REGISTRATION_FIELDS } from 'src/dict/fields/models/registration';
import { notifyErrorFn } from 'src/models/Helpers/Notify';
import { goToLoginPageFn, loginForm } from 'src/models/Login';
import { DEFAULT_RESEND_CODE, USER_CONFIRM_FIELDS } from 'src/dict/fields/models/user';
import { LOGIN_FIELDS } from 'src/dict/fields/models/login';
import {
  $isRegistrationPage, authRegistrationFx,
  registrationForm,
} from '.';
import { $secondsToResendEmailCode, userConfirmForm } from '../User';

sample({
  clock: debounce({
    source: $isRegistrationPage,
    timeout: 150,
  }),
  source: registrationForm.$isDirty,
  filter: (isDirty, isRegistrationPage) => isDirty && isRegistrationPage === false,
  target: registrationForm.reset,
});

sample({
  clock: registrationForm.formValidated,
  source: registrationForm.$values,
  target: authRegistrationFx,
});

sample({
  clock: authRegistrationFx.doneData,
  source: registrationForm.$values,
  target: [
    userConfirmForm.setForm.prepend((form) => ({
      [USER_CONFIRM_FIELDS.EMAIL]: form[REGISTRATION_FIELDS.EMAIL],
    })),
    loginForm.setForm.prepend((form) => ({
      [LOGIN_FIELDS.EMAIL]: form[REGISTRATION_FIELDS.EMAIL],
      [LOGIN_FIELDS.PASSWORD]: form[REGISTRATION_FIELDS.PASSWORD],
    })),
    goToLoginPageFn,
  ],
});

sample({
  clock: authRegistrationFx.doneData,
  fn: () => DEFAULT_RESEND_CODE,
  target: $secondsToResendEmailCode,
});

sample({
  clock: authRegistrationFx.fail,
  target: notifyErrorFn.prepend((error) => {
    let { msg } = errorMsgHandler(error);

    Object.keys(REGISTRATION_ERRORS).forEach((status) => {
      if (status === msg) {
        msg = REGISTRATION_ERRORS[msg];
      }
    });

    return msg;
  }),
});