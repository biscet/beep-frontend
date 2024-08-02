import { get } from 'src/lib/lodash';
import {
  $catalogProjects, $countCatalogProjects,
  $isProjectCatalogPage, getCatalogProjectsFx,
  resetCatalogProjectsFn,
} from '.';
import { crudStoreBehaviorPageFb } from '../..';

$catalogProjects
  .reset(resetCatalogProjectsFn)
  .on(getCatalogProjectsFx.doneData, (_, data) => get(data, 'projects', []));

$countCatalogProjects
  .reset(resetCatalogProjectsFn)
  .on(getCatalogProjectsFx.doneData, (_, data) => get(data, 'total_projects', 0));

// Запрашиваем список проектов на странице каталога
crudStoreBehaviorPageFb({
  $page: $isProjectCatalogPage,
  isPageLogic: getCatalogProjectsFx,
  isNotPageLogic: resetCatalogProjectsFn,
});