import { sample } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { AppGate } from 'src/models/App';
import { crossCatalogType, TYPE_CATALOG_FIELD } from 'src/dict/header-catalog';
import { changeTypeCatalogFn, $typeCatalog } from './index';

$typeCatalog.on(changeTypeCatalogFn, (_, theme) => theme);

sample({
  clock: AppGate.state,
  filter: () => isEmpty(storage.get(TYPE_CATALOG_FIELD)),
  fn: () => crossCatalogType,
  target: changeTypeCatalogFn,
});