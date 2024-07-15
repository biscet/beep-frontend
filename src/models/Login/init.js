import { sample } from 'effector';
import { loginForm } from '.';

sample({
  clock: loginForm.formValidated,
  fn: () => {
    console.log('validated login');
  },
});