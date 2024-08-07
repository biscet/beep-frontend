import React, { createContext } from 'react';
import { createComponent } from 'effector-react';
import {
  $i18nCombineData, $lang, changeLangFn,
} from 'src/models/Helpers/i18n';
import { LANGUAGES, LANGUAGES_NAMES_ABRV } from 'src/dict/translates';
import { LanguageSVG } from 'src/ui/media/images';
import { translate } from 'src/lib/helpers';

export const I18nContext = createContext();

export const I18nProvider = createComponent($i18nCombineData, ({ children }, i18nCombineData) => (
  <I18nContext.Provider value={translate(i18nCombineData)}>
    {children}
  </I18nContext.Provider>
));

export const LanguagePicker = createComponent($lang, ({ abrvLeftSide = true }, lang) => {
  const changeLanguage = () => {
    changeLangFn(lang === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU);
  };

  return (
    <div className="language-picker" onClick={changeLanguage}>
      {abrvLeftSide ? (
        <>
          {LANGUAGES_NAMES_ABRV[lang]}
          <LanguageSVG />
        </>
      ) : (
        <>
          <LanguageSVG />
          {LANGUAGES_NAMES_ABRV[lang]}
        </>
      )}
    </div>
  );
});