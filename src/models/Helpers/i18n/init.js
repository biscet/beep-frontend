import { sample } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { LANG_FIELD } from 'src/dict/translates';
import { AppGate } from 'src/models/App';
import { getLang } from 'src/lib/helpers';
import {
  changeLangFn, $lang, $webApiLanguage,
} from './index';

$lang.on(changeLangFn, (_, lang) => lang);

sample({
  clock: AppGate.state,
  source: $webApiLanguage,
  filter: () => isEmpty(storage.get(LANG_FIELD)),
  fn: (webApiLanguage) => getLang(webApiLanguage),
  target: changeLangFn,
});
