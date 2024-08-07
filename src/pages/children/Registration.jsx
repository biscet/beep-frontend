import { reflect } from '@effector/reflect';
import { createComponent } from 'effector-react';
import React, { useContext } from 'react';
import { BUTTON_TYPES } from 'src/dict/fields/button';
import { INPUT_TYPES } from 'src/dict/fields/input';
import { REGISTRATION_FIELDS } from 'src/dict/fields/models/registration';
import { getReflectPropsField } from 'src/lib/form';
import {
  $disabledRegistrationCombineData, $registrationPending,
  registrationForm,
} from 'src/models/Registration';
import { Button, Form, Input } from 'src/ui/components/Form';
import { I18nContext } from 'src/ui/components/Helpers';
import { LoaderSpinnerSVG } from 'src/ui/media/images';

const EmailField = reflect({
  view: Input,
  bind: {
    ...getReflectPropsField(REGISTRATION_FIELDS.EMAIL, registrationForm),
    placeholder: 'E-mail',
    name: REGISTRATION_FIELDS.EMAIL,
    nonActiveClass: 'input_full',
    type: INPUT_TYPES.TEXT,
  },
});

const UserNameField = reflect({
  view: Input,
  bind: {
    ...getReflectPropsField(REGISTRATION_FIELDS.USERNAME, registrationForm),
    placeholder: 'Имя пользователя',
    name: REGISTRATION_FIELDS.USERNAME,
    nonActiveClass: 'input_full',
    type: INPUT_TYPES.TEXT,
    caption: 'Имя должно содержать от 4 до 30 символов и может включать только буквы и цифры.',
  },
});

const PasswordField = reflect({
  view: Input,
  bind: {
    ...getReflectPropsField(REGISTRATION_FIELDS.PASSWORD, registrationForm),
    placeholder: 'Пароль',
    name: REGISTRATION_FIELDS.PASSWORD,
    nonActiveClass: 'input_full',
    type: INPUT_TYPES.PASSWORD,
    caption: 'Пароль должен состоять как минимум из 8 символов.',
  },
});

const FormButton = createComponent(
  [$disabledRegistrationCombineData, $registrationPending], (_, units) => {
    const t = useContext(I18nContext);
    const [disabledRegistrationButton, registrationPending] = units;

    return (
      <Button
        disabled={disabledRegistrationButton || registrationPending}
        type={BUTTON_TYPES.SUBMIT}
        nonActiveClass="button_full"
        id="registration"
      >
        {registrationPending === false ? t('Зарегистрироваться') : <LoaderSpinnerSVG />}
      </Button>
    );
  },
);

export const Registration = () => {
  const t = useContext(I18nContext);

  return (
    <div className="registration-page">
      <div className="registration-page__wrapper">
        <Form className="registration-page__window window" id="registration" submit={registrationForm.submit}>
          <h1>{t('Создать аккаунт')}</h1>

          <div className="window__box">
            <EmailField />
            <UserNameField />
            <PasswordField />
          </div>

          <FormButton />
        </Form>

        <div className="registration-page__shape shape shape_one" />
        <div className="registration-page__shape shape shape_two" />
        <div className="registration-page__shape shape shape_three" />
      </div>
    </div>
  );
};
