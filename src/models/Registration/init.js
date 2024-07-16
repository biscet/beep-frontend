import { sample } from 'effector';
import { debounce } from 'patronum';
import { $isRegistrationPage, registrationForm } from '.';

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
  fn: () => {
    console.log('validated reg');
  },
});