import { allDomain } from 'src/models/App';
import { persist } from 'effector-storage/local';
import { typeCatalogContract } from 'src/lib/contracts';
import { crossCatalogType, TYPE_CATALOG_FIELD } from 'src/dict/header-catalog';

const headerCatalogDomain = allDomain.createDomain('HeaderCatalog');

export const changeTypeCatalogFn = headerCatalogDomain.createEvent();

export const $typeCatalog = headerCatalogDomain.createStore(crossCatalogType, { name: TYPE_CATALOG_FIELD });

persist({ store: $typeCatalog, key: TYPE_CATALOG_FIELD, contract: typeCatalogContract() });