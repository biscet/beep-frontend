import React, { useContext } from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { PAGES_PATH } from 'src/dict/path';
import { Button } from 'src/ui/components/Form';
import { I18nContext, LanguagePicker, ThemePicker } from 'src/ui/components/Helpers';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const t = useContext(I18nContext);

  return (
    <div className="header">
      <NavLink
        to="/"
        className="header__logo"
        activeClassName=""
      >
        beep
      </NavLink>

      <div className="header__nav nav">
        <ThemePicker />
        <LanguagePicker />

        <Button
          type={BUTTON_TYPES.LINK}
          variant={BUTTON_VARIATION.TEXT}
          path={`/${PAGES_PATH.LOGIN}`}
        >
          {t('Вход')}
        </Button>

        <Button type={BUTTON_TYPES.LINK} path={`/${PAGES_PATH.REGISTRATION}`}>
          {t('Регистрация')}
        </Button>
      </div>
    </div>
  );
};