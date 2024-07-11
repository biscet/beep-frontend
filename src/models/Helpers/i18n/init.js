import { sample } from 'effector';
import { get, isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { LANG_FIELD, LANGUAGES } from 'src/dict/translates';
import { AppGate } from 'src/models/App';
import {
  changeLangFn, getLangFn, $lang,
  changeLangFx, getLangFx,
} from './index';

$lang
  .on(changeLangFn, (_, val) => val)
  .on(getLangFx.doneData, (_, val) => val);

sample({
  clock: AppGate.state,
  filter: () => isEmpty(storage.get(LANG_FIELD)),
  fn: () => (['ru-RU', 'ru'].includes(get(window, 'navigator.languages.0', '')) ? LANGUAGES.RU : LANGUAGES.EN),
  target: changeLangFn,
});

sample({
  clock: changeLangFn,
  target: changeLangFx,
});

sample({
  clock: getLangFn,
  target: getLangFx,
});