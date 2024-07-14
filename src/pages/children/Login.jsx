import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { Button, Input } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';

export const Login = () => {
  const t = useContext(I18nContext);

  return (
    <div className="login-page">
      <div className="login-page__wrapper">
        <div className="login-page__window window">
          <h1>{t('Вход')}</h1>

          <div className="window__box">
            <Input
              placeholder="E-mail"
              nonActiveClass="input_full"
            />

            <Input
              placeholder="Пароль"
              nonActiveClass="input_full"
            />
          </div>

          <Button type={BUTTON_TYPES.BUTTON} nonActiveClass="button_full">{t('Войти')}</Button>
        </div>

        <div className="login-page__shape shape shape_one" />
        <div className="login-page__shape shape shape_two" />
        <div className="login-page__shape shape shape_three" />
      </div>
    </div>
  );
};
