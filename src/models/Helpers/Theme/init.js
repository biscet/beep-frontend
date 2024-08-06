import { sample } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { AppGate } from 'src/models/App';
import { THEME_FIELD } from 'src/dict/theme';
import { getTheme } from 'src/lib/helpers';
import { htmlContainer } from 'src/dict/config';
import { changeThemeFn, $theme, $matchesTheme } from './index';

$theme.on(changeThemeFn, (_, theme) => theme);

sample({
  clock: AppGate.state,
  source: $matchesTheme,
  filter: () => isEmpty(storage.get(THEME_FIELD)),
  fn: (matchesTheme) => getTheme(matchesTheme),
  target: changeThemeFn,
});

sample({
  clock: $theme,
  fn: (theme) => {
    htmlContainer.classList = [theme];
    htmlContainer.dataset.theme = theme;
    return null;
  },
});