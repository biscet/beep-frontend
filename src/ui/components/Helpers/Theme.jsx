import React from 'react';
import { useUnit } from 'effector-react';
import { $theme, changeThemeFn } from 'src/models/Helpers/Theme';
import { THEMES } from 'src/dict/theme';
import { ThemeSVG } from 'src/ui/media/images';

export const ThemePicker = React.memo(() => {
  const theme = useUnit($theme);

  const changeTheme = () => {
    changeThemeFn(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return (
    <div className="theme-picker theme-toggle" onClick={changeTheme} aria-label={theme}>
      <ThemeSVG />
    </div>
  );
});