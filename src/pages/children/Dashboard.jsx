import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';

export const Dashboard = () => {
  const t = useContext(I18nContext);

  return (
    <div className="page page_dashboard">
      <h1>{t('Дашборд')}</h1>
    </div>
  );
};
