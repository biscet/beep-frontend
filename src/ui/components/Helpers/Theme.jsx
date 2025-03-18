import React from 'react';
import { createComponent } from 'effector-react';
import { $theme, changeThemeFn } from 'src/models/Helpers/Theme';
import { THEMES } from 'src/dict/theme';
import { ThemeSVG } from 'src/ui/media/images';
import { $innerSizes } from 'src/models/Helpers/Resize';
import { $isWebPage } from 'src/models/Web';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { Button } from '../Form/Button';

export const ThemePicker = createComponent([$theme, $innerSizes, $isWebPage], (_, units) => {
  const [theme, { width }, isWebPage] = units;

  const changeTheme = () => {
    changeThemeFn(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return (width < 1281) && !isWebPage ? (
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON_VARIATION.SECONDARY}
      onClick={changeTheme}
    >
      <div className="theme-picker theme-toggle" aria-label={theme}>
        <ThemeSVG />
      </div>
    </Button>
  ) : (
    <div className="theme-picker theme-toggle" onClick={changeTheme} aria-label={theme}>
      <ThemeSVG />
    </div>
  );
});