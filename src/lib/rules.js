import { isEmpty } from 'src/lib/lodash';

export const emailPattern = /\S+@\S+\.\S+/;
export const passwordPattern = /^.{8,}$/;

export const rules = {
  required: () => ({
    name: 'required',
    validator: (value) => ({
      isValid: !isEmpty(value),
      errorText: 'Данное поле обязательно для заполнения',
    }),
  }),
  email: () => ({
    name: 'email',
    validator: (value) => ({
      isValid: emailPattern.test(value),
      errorText: 'Указан некорректный email-адрес',
    }),
  }),
  password: () => ({
    name: 'password',
    validator: (value) => ({
      isValid: passwordPattern.test(value),
      errorText: 'Длина пароля должна быть не менее 8 символов',
    }),
  }),
};