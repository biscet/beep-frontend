import { THEME_FIELD } from 'src/dict/theme';
import { getTheme } from 'src/lib/helpers';
import { storage } from 'src/lib/storage';
import { allDomain } from 'src/models/App';

const themeDomain = allDomain.createDomain('Theme');

export const getThemeFn = themeDomain.createEvent();
export const changeThemeFn = themeDomain.createEvent();

export const $theme = themeDomain.createStore(getTheme());

export const getThemeFx = themeDomain.createEffect(() => getTheme());

export const changeThemeFx = themeDomain.createEffect((theme) => {
  storage.set(THEME_FIELD, theme);
  return theme;
});
