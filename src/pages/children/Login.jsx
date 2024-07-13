import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';

export const Login = () => {
  const t = useContext(I18nContext);

  return (
    <div>
      {t('Login')}
    </div>
  );
};
