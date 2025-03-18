import React, { useContext, useEffect } from 'react';
import { Button, Form, InputChars } from 'src/ui/components/Form';
import { I18nContext, ShimmerCodeResend } from 'src/ui/components/Helpers';
import {
  $disabledUserConfirmCombineData, $secondsToResendEmailCode,
  resendConfirmCodeFn, resetConfirmCodeFn, userConfirmForm, userConfirmFx,
  userGetConfirmCodeFx,
} from 'src/models/User';
import { USER_CONFIRM_FIELDS } from 'src/dict/fields/models/user';
import { reflect } from '@effector/reflect';
import { getReflectPropsField } from 'src/lib/form';
import { LoaderSpinnerSVG } from 'src/ui/media/images';
import { authLoginFx } from 'src/models/Login';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { createComponent } from 'effector-react';
import { DEFAULT_DIGITS_FOR_CONFIRM_USER } from 'src/dict/config';
import { timerHook } from 'src/ui/hooks';

const CodeZoneField = reflect({
  view: InputChars,
  bind: {
    ...getReflectPropsField(USER_CONFIRM_FIELDS.CODE, userConfirmForm),
    name: USER_CONFIRM_FIELDS.CODE,
    digits: DEFAULT_DIGITS_FOR_CONFIRM_USER,
  },
});

const ResendCode = createComponent(
  [$secondsToResendEmailCode, userGetConfirmCodeFx.pending], (_, units) => {
    const t = useContext(I18nContext);
    const [initialSeconds, getCodePending] = units;
    const { time, seconds } = timerHook(initialSeconds);

    useEffect(() => {
      if (seconds < 1) {
        resetConfirmCodeFn();
      }
    }, [seconds]);

    return initialSeconds === -1 ? <ShimmerCodeResend /> : (
      <div className="window__timer timer">
        {seconds > 0 ? t('Повторить отправку кода можно через {{value1}}', [time])
          : (
            <Button
              type={BUTTON_TYPES.BUTTON}
              variant={BUTTON_VARIATION.TEXT}
              disabled={getCodePending}
              onClick={resendConfirmCodeFn}
            >
              {t('Отправить новый код')}
            </Button>
          )}
      </div>
    );
  },
);

const FormButton = createComponent(
  [$disabledUserConfirmCombineData, authLoginFx.pending, userConfirmFx.pending], (_, units) => {
    const t = useContext(I18nContext);
    const [disableButton, loginPending, confirmPending] = units;
    return (
      <Button
        type={BUTTON_TYPES.SUBMIT}
        disabled={disableButton || loginPending || confirmPending}
        nonActiveClass="button_full"
        form="userConfirm"
      >
        {(loginPending === false) && (confirmPending === false)
          ? t('Подтвердить аккаунт') : <LoaderSpinnerSVG />}
      </Button>
    );
  },
);

export const CodeFields = () => {
  const t = useContext(I18nContext);

  return (
    <Form className="login-page__window window window_code" id="userConfirm" submit={userConfirmForm.submit}>
      <h1>{t('Вход')}</h1>

      <div className="window__box box box_code">
        <CodeZoneField />
        <p>{t('Введите код, который мы отправили на вашу почту для подтверждения аккаунта.')}</p>
      </div>

      <div className="window__footer">
        <FormButton />
        <ResendCode />
      </div>
    </Form>
  );
};
