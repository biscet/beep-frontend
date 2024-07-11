import React, { createContext } from 'react';
import { useUnit } from 'effector-react';
import { $i18nCombineData, translate } from 'src/models/Helpers/i18n';

export const I18nContext = createContext();

export const I18nProvider = ({ children }) => (
  <I18nContext.Provider value={translate(useUnit($i18nCombineData))}>
    {children}
  </I18nContext.Provider>
);
