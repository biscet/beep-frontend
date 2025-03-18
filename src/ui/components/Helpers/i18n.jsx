import React, { createContext } from 'react';
import { createComponent } from 'effector-react';
import {
  $i18nCombineData, $lang, changeLangFn,
} from 'src/models/Helpers/i18n';
import { LANGUAGES, LANGUAGES_NAMES_ABRV } from 'src/dict/translates';
import { LanguageSVG } from 'src/ui/media/images';
import { translate } from 'src/lib/helpers';
import { $innerSizes } from 'src/models/Helpers/Resize';
import { $isWebPage } from 'src/models/Web';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { Button } from '../Form/Button';

export const I18nContext = createContext();

export const I18nProvider = createComponent($i18nCombineData, ({ children }, i18nCombineData) => (
  <I18nContext.Provider value={translate(i18nCombineData)}>
    {children}
  </I18nContext.Provider>
));

export const LanguagePicker = createComponent([
  $lang, $innerSizes, $isWebPage], ({ abrvLeftSide = true }, units) => {
  const [lang, { width }, isWebPage] = units;

  const changeLanguage = () => {
    changeLangFn(lang === LANGUAGES.RU ? LANGUAGES.EN : LANGUAGES.RU);
  };

  return (width < 1281) && !isWebPage ? (
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON_VARIATION.SECONDARY}
      onClick={changeLanguage}
    >
      <div className="language-picker">
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
    </Button>
  ) : (
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