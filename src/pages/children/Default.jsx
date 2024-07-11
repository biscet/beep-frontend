import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/i18n';

export const Default = () => {
  const t = useContext(I18nContext);

  return (
    <div>
      {t('Текст')}
    </div>
  );
};
