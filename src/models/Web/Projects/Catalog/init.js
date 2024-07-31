import { split } from 'effector';
import {
  $catalogProjects, $countCatalogProjects,
  $isProjectCatalogPage, getCatalogProjectsFx,
  resetCatalogProjectsFn,
} from '.';

$catalogProjects
  .reset(resetCatalogProjectsFn);

$countCatalogProjects
  .reset(resetCatalogProjectsFn);

// Запрашиваем список проектов на странице каталога
split({
  source: $isProjectCatalogPage,
  match: {
    isPage: (isProjectCatalogPage) => isProjectCatalogPage,
    isNotPage: (isProjectCatalogPage) => !isProjectCatalogPage,
  },
  cases: {
    isPage: getCatalogProjectsFx,
    isNotPage: resetCatalogProjectsFn,
  },
});