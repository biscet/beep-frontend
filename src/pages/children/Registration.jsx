import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';

export const Registration = () => {
  const t = useContext(I18nContext);

  return (
    <div>
      {t('Registration')}
    </div>
  );
};
