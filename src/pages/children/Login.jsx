import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { INPUT_TYPES } from 'src/dict/fields/input';
import { LOGIN_FIELDS } from 'src/dict/fields/models/login';
import { Button, Form, Input } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { getPropsField } from 'src/lib/form';
import { useForm } from 'effector-forms';
import { $disabledLoginCombineData, authLoginFx, loginForm } from 'src/models/Login';
import { useUnit } from 'effector-react';
import { LoaderSpinnerSVG } from 'src/ui/media/images';

export const Login = () => {
  const t = useContext(I18nContext);
  const { submit, ...restProps } = useForm(loginForm);
  const [disabledLoginButton, loginPending] = useUnit([$disabledLoginCombineData, authLoginFx.pending]);

  return (
    <div className="login-page">
      <div className="login-page__wrapper">
        <Form className="login-page__window window" submit={submit}>
          <h1>{t('Вход')}</h1>

          <div className="window__box">
            <Input
              placeholder="Имя или e-mail пользователя"
              nonActiveClass="input_full"
              type={INPUT_TYPES.TEXT}
              name={LOGIN_FIELDS.EMAIL}
              {...getPropsField({
                fieldName: LOGIN_FIELDS.EMAIL, props: restProps,
              })}
            />

            <Input
              placeholder="Пароль"
              nonActiveClass="input_full"
              type={INPUT_TYPES.PASSWORD}
              name={LOGIN_FIELDS.PASSWORD}
              {...getPropsField({
                fieldName: LOGIN_FIELDS.PASSWORD, props: restProps,
              })}
            />
          </div>

          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={disabledLoginButton || loginPending}
            nonActiveClass="button_full"
          >
            {loginPending === false ? t('Войти') : <LoaderSpinnerSVG />}
          </Button>
        </Form>

        <div className="login-page__shape shape shape_one" />
        <div className="login-page__shape shape shape_two" />
        <div className="login-page__shape shape shape_three" />
      </div>
    </div>
  );
};
