import React from 'react';
import { useUnit } from 'effector-react';
import { $isConfirmEmail } from 'src/models/User';

import { CodeFields } from './children/CodeFields';
import { FormFields } from './children/FormFields';

export const Login = () => {
  const isConfirmEmail = useUnit($isConfirmEmail);

  return (
    <div className="login-page">
      <div className="login-page__wrapper">
        {isConfirmEmail ? <CodeFields /> : <FormFields />}

        <div className="login-page__shape shape shape_one" />
        <div className="login-page__shape shape shape_two" />
        <div className="login-page__shape shape shape_three" />
      </div>
    </div>
  );
};
