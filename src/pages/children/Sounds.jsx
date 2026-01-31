import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';

export const Sounds = () => {
  const t = useContext(I18nContext);

  return (
    <div className="page page_sounds">
      <h1>{t('Звуки')}</h1>
    </div>
  );
};
