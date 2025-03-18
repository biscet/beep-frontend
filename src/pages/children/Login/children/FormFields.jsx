import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { INPUT_TYPES } from 'src/dict/fields/input';
import { LOGIN_FIELDS } from 'src/dict/fields/models/login';
import { Button, Form, Input } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { getReflectPropsField } from 'src/lib/form';
import { $disabledLoginCombineData, authLoginFx, loginForm } from 'src/models/Login';
import { createComponent } from 'effector-react';
import { LoaderSpinnerSVG } from 'src/ui/media/images';
import { reflect } from '@effector/reflect';

const EmailField = reflect({
  view: Input,
  bind: {
    ...getReflectPropsField(LOGIN_FIELDS.EMAIL, loginForm),
    placeholder: 'Имя или e-mail пользователя',
    name: LOGIN_FIELDS.EMAIL,
    nonActiveClass: 'input_full',
    type: INPUT_TYPES.TEXT,
  },
});

const PasswordField = reflect({
  view: Input,
  bind: {
    ...getReflectPropsField(LOGIN_FIELDS.PASSWORD, loginForm),
    placeholder: 'Пароль',
    name: LOGIN_FIELDS.PASSWORD,
    nonActiveClass: 'input_full',
    type: INPUT_TYPES.PASSWORD,
  },
});

const FormButton = createComponent(
  [$disabledLoginCombineData, authLoginFx.pending], (_, units) => {
    const t = useContext(I18nContext);
    const [disabledLoginButton, loginPending] = units;
    return (
      <Button
        type={BUTTON_TYPES.SUBMIT}
        disabled={disabledLoginButton || loginPending}
        nonActiveClass="button_full"
        form="login"
      >
        {loginPending === false ? t('Войти') : <LoaderSpinnerSVG />}
      </Button>
    );
  },
);

export const FormFields = () => {
  const t = useContext(I18nContext);

  return (
    <Form className="login-page__window window" id="login" submit={loginForm.submit}>
      <h1>{t('Вход')}</h1>

      <div className="window__box">
        <EmailField />
        <PasswordField />
      </div>

      <FormButton />
    </Form>
  );
};