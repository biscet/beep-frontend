import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { INPUT_TYPES } from 'src/dict/fields/input';
import { REGISTRATION_FIELDS } from 'src/dict/fields/models/registration';
import { getPropsField } from 'src/lib/form';
import { $disabledRegistrationCombineData, registrationForm } from 'src/models/Registration';
import { Button, Form, Input } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';

export const Registration = () => {
  const t = useContext(I18nContext);
  const { submit, ...restProps } = useForm(registrationForm);
  const [disabledRegistrationButton] = useUnit([$disabledRegistrationCombineData]);

  return (
    <div className="registration-page">
      <div className="registration-page__wrapper">
        <Form className="registration-page__window window" submit={submit}>
          <h1>{t('Создать аккаунт')}</h1>

          <div className="window__box">
            <Input
              placeholder="E-mail"
              type={INPUT_TYPES.TEXT}
              nonActiveClass="input_full"
              name={REGISTRATION_FIELDS.EMAIL}
              {...getPropsField({
                fieldName: REGISTRATION_FIELDS.EMAIL, props: restProps,
              })}
            />

            <Input
              placeholder="Имя пользователя"
              nonActiveClass="input_full"
              type={INPUT_TYPES.TEXT}
              caption="Имя должно содержать от 4 до 30 символов и может включать только буквы и цифры."
              name={REGISTRATION_FIELDS.USERNAME}
              {...getPropsField({
                fieldName: REGISTRATION_FIELDS.USERNAME, props: restProps,
              })}
            />

            <Input
              placeholder="Пароль"
              nonActiveClass="input_full"
              type={INPUT_TYPES.PASSWORD}
              caption="Пароль должен состоять как минимум из 8 символов."
              name={REGISTRATION_FIELDS.PASSWORD}
              {...getPropsField({
                fieldName: REGISTRATION_FIELDS.PASSWORD, props: restProps,
              })}
            />
          </div>

          <Button
            disabled={disabledRegistrationButton}
            type={BUTTON_TYPES.SUBMIT}
            nonActiveClass="button_full"
          >
            {t('Зарегистрироваться')}
          </Button>
        </Form>

        <div className="registration-page__shape shape shape_one" />
        <div className="registration-page__shape shape shape_two" />
        <div className="registration-page__shape shape shape_three" />
      </div>
    </div>
  );
};
