import React, { createContext } from 'react';
import { useUnit } from 'effector-react';
import {
  $i18nCombineData, $lang, changeLangFn, translate,
} from 'src/models/Helpers/i18n';
import { LANGUAGES, LANGUAGES_NAMES_ABRV } from 'src/dict/translates';
import { LanguageSVG } from 'src/ui/media/images';

export const I18nContext = createContext();

export const I18nProvider = ({ children }) => (
  <I18nContext.Provider value={translate(useUnit($i18nCombineData))}>
    {children}
  </I18nContext.Provider>
);

export const LanguagePicker = () => {
  const lang = useUnit($lang);

  const changeLanguage = () => {
    changeLangFn(lang === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU);
  };

  return (
    <div className="language-picker" onClick={changeLanguage}>
      {LANGUAGES_NAMES_ABRV[lang]}
      <LanguageSVG />
    </div>
  );
};