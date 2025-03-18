import { get, isEmpty } from 'src/lib/lodash';
import { combine, sample } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import {
  $paginationQuery, catalogPaginationFb,
} from 'src/models/Helpers/Pagination';
import { $pathParams } from 'src/models/App';
import { getAllQueryParamsFromUrl, getQueryParamFromUrl } from 'src/lib/url';
import { invoke } from '@withease/factories';
import { debounce } from 'patronum';
import { PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import {
  $catalogProjects, $countCatalogProjects,
  $isProjectCatalogPage, getCatalogProjectsFx,
  getCatalogProjectsFn,
  resetCatalogProjectsFn, goToProjectsCatalogFn,
  catalogForm,
} from '.';
import { crudStoreBehaviorPageFb } from '../..';
import { $projectsBackground, $projectsStatuses } from '..';

$catalogProjects
  .reset(resetCatalogProjectsFn)
  .on(getCatalogProjectsFx.doneData, (_, data) => get(data, 'results', []))
  .on(getCatalogProjectsFx.fail, () => []);

$countCatalogProjects
  .reset(resetCatalogProjectsFn)
  .on(getCatalogProjectsFx.doneData, (_, data) => get(data, 'count', 0));

sample({
  clock: goToProjectsCatalogFn,
  target: pushHistoryFn.prepend((params) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${CRUD_PATH.CATALOG}?${params}`),
});

invoke(catalogPaginationFb, {
  $page: $isProjectCatalogPage,
  goToPage: goToProjectsCatalogFn,
  fxByUndefinedPage: getCatalogProjectsFx,
});

// Запрашиваем список проектов на странице каталога
invoke(crudStoreBehaviorPageFb, {
  $page: combine($isProjectCatalogPage, $pathParams),
  isPageLogic: getCatalogProjectsFn,
  isNotPageLogic: resetCatalogProjectsFn,
});

sample({
  clock: $projectsStatuses,
  source: $catalogProjects,
  filter: (projects, statuses) => !isEmpty(projects) && !isEmpty(statuses),
  fn: (projects, statuses) => projects.map((project) => {
    const id = get(project, PROJECT_FIELDS.ID, '');
    const status = get(statuses, id, '');
    return isEmpty(status) ? project : { ...project, [PROJECT_FIELDS.STATUS]: status };
  }),
  target: $catalogProjects,
});

sample({
  clock: $projectsBackground,
  source: $catalogProjects,
  filter: (projects, backgrounds) => !isEmpty(projects) && !isEmpty(backgrounds),
  fn: (projects, backgrounds) => projects.map((project) => {
    const id = get(project, PROJECT_FIELDS.ID, '');
    const background = get(backgrounds, id, '');
    return isEmpty(background) ? project : { ...project, [PROJECT_FIELDS.PREVIEW_IMAGE]: background };
  }),
  target: $catalogProjects,
});

sample({
  clock: [
    getCatalogProjectsFn,
    debounce({
      source: catalogForm.$values,
      timeout: 300,
    }),
  ],
  source: [$pathParams, $paginationQuery, catalogForm.$values],
  filter: ([pathParams]) => !isEmpty(getQueryParamFromUrl(pathParams, 'page')),
  fn: ([, paginationQuery, form]) => {
    const params = getAllQueryParamsFromUrl();
    const projectParams = { [PROJECT_FIELDS.NAME]: get(form, PROJECT_FIELDS.NAME, '') };
    delete params.page;

    if (isEmpty(projectParams[PROJECT_FIELDS.NAME])) {
      delete projectParams[PROJECT_FIELDS.NAME];
    }

    return { ...params, ...paginationQuery, ...projectParams };
  },
  target: getCatalogProjectsFx,
});
