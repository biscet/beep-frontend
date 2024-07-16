import { sample } from 'effector';
import { debounce } from 'patronum';
import { $isLoginPage, loginForm } from '.';

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
  fn: () => {
    console.log('validated login');
  },
});