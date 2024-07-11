import { sample } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { AppGate } from 'src/models/App';
import { THEME_FIELD, THEMES } from 'src/dict/theme';
import { getBrowserTheme } from 'src/lib/helpers';
import {
  changeThemeFn, getThemeFn, $theme,
  changeThemeFx, getThemeFx,
} from './index';

$theme
  .on(changeThemeFn, (_, val) => val)
  .on(getThemeFx.doneData, (_, val) => val);

sample({
  clock: AppGate.state,
  filter: () => isEmpty(storage.get(THEME_FIELD)),
  fn: () => (getBrowserTheme() ? THEMES.DARK : THEMES.LIGHT),
  target: changeThemeFn,
});

sample({
  clock: changeThemeFn,
  target: changeThemeFx,
});

sample({
  clock: getThemeFn,
  target: getThemeFx,
});