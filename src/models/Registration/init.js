import { sample } from 'effector';
import { debounce } from 'patronum';
import { $isRegistrationPage, authRegistrationFx, registrationForm } from '.';
import { notifyErrorFn } from '../Helpers/Notify';

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
  clock: registrationForm.submit,
  target: authRegistrationFx,
});

sample({
  clock: authRegistrationFx.doneData,
  source: registrationForm.$values,
  fn: (form) => {
    console.log(form);
  },
});

sample({
  clock: authRegistrationFx.fail,
  target: notifyErrorFn.prepend(() => 'Что-то пошло не так. Повторите попытку позже.'),
});