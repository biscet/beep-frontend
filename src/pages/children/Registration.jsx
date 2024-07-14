import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { Button, Input } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';

export const Registration = () => {
  const t = useContext(I18nContext);

  return (
    <div className="registration-page">
      <div className="registration-page__wrapper">
        <div className="registration-page__window window">
          <h1>{t('Создать аккаунт')}</h1>

          <div className="window__box">
            <Input
              placeholder="E-mail"
              nonActiveClass="input_full"
            />

            <Input
              placeholder="Пароль"
              nonActiveClass="input_full"
            />

            <Input
              placeholder="Повторите пароль"
              nonActiveClass="input_full"
            />
          </div>

          <Button type={BUTTON_TYPES.BUTTON} nonActiveClass="button_full">{t('Зарегистрироваться')}</Button>
        </div>

        <div className="registration-page__shape shape shape_one" />
        <div className="registration-page__shape shape shape_two" />
        <div className="registration-page__shape shape shape_three" />
      </div>
    </div>
  );
};
