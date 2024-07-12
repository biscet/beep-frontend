import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { htmlContainer } from 'src/dict/config';
import { $theme, changeThemeFn } from 'src/models/Helpers/Theme';
import { THEMES } from 'src/dict/theme';
import { ThemeSVG } from 'src/ui/media/images';

export const Theme = () => {
  const theme = useUnit($theme);

  useEffect(() => {
    htmlContainer.classList = [theme];
    htmlContainer.dataset.theme = theme;
  }, [theme]);

  return null;
};

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