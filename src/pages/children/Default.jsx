import React, { useContext } from 'react';
import { I18nContext } from 'src/ui/components/Helpers';

export const Default = () => {
  const t = useContext(I18nContext);

  return (
    <div>
      {t('')}
    </div>
  );
};
