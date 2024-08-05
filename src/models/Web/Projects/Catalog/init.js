import { get, isEmpty } from 'src/lib/lodash';
import { combine, sample } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import {
  $paginationQuery, catalogPaginationFb,
} from 'src/models/Helpers/Pagination';
import { $pathParams } from 'src/models/App';
import { getAllQueryParamsFromUrl, getQueryParamFromUrl } from 'src/lib/url';
import {
  $catalogProjects, $countCatalogProjects,
  $isProjectCatalogPage, getCatalogProjectsFx,
  getCatalogProjectsFn,
  resetCatalogProjectsFn, goToProjectsCatalogFn,
} from '.';
import { crudStoreBehaviorPageFb } from '../..';

$catalogProjects
  .reset(resetCatalogProjectsFn)
  .on(getCatalogProjectsFx.doneData, (_, data) => get(data, 'results', []));

$countCatalogProjects
  .reset(resetCatalogProjectsFn)
  .on(getCatalogProjectsFx.doneData, (_, data) => get(data, 'count', 0));

sample({
  clock: goToProjectsCatalogFn,
  target: pushHistoryFn.prepend((params) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${CRUD_PATH.CATALOG}?${params}`),
});

catalogPaginationFb({
  $page: $isProjectCatalogPage,
  goToPage: goToProjectsCatalogFn,
  fxByUndefinedPage: getCatalogProjectsFx,
});

// Запрашиваем список проектов на странице каталога
crudStoreBehaviorPageFb({
  $page: combine($isProjectCatalogPage, $pathParams),
  isPageLogic: getCatalogProjectsFn,
  isNotPageLogic: resetCatalogProjectsFn,
});

sample({
  clock: getCatalogProjectsFn,
  source: [$pathParams, $paginationQuery],
  filter: ([pathParams]) => !isEmpty(getQueryParamFromUrl(pathParams, 'page')),
  fn: ([, paginationQuery]) => {
    const params = getAllQueryParamsFromUrl();
    delete params.page;
    return { ...params, ...paginationQuery };
  },
  target: getCatalogProjectsFx,
});
