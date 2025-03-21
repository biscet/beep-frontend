import {
  CRUD_PATH, PAGES_PATH, WEB_PATH,
} from 'src/dict/path';
import { getCatalogProjectsSign } from 'src/api/projects';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';
import { pending } from 'patronum';
import { createForm } from 'effector-forms';
import { PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { combine } from 'effector';
import { $paginationCurrentPage } from 'src/models/Helpers/Pagination';
import { crossPagination } from 'src/dict/pagination';
import { projectsDomain } from '..';

const { CATALOG } = CRUD_PATH;

export const goToProjectsCatalogFn = projectsDomain.createEvent();

export const getCatalogProjectsFn = projectsDomain.createEvent();
export const resetCatalogProjectsFn = projectsDomain.createEvent();

export const $catalogProjects = projectsDomain.createStore([]);
export const $countCatalogProjects = projectsDomain.createStore(0);

export const getCatalogProjectsFx = projectsDomain.createEffect(getCatalogProjectsSign);

export const $isProjectCatalogPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, CATALOG]),
);

export const catalogForm = createForm({
  fields: {
    [PROJECT_FIELDS.NAME]: {
      rules: [],
      init: '',
    },
  },
  validateOn: ['change'],
  domain: projectsDomain,
});

export const $isLoading = pending({
  effects: [getCatalogProjectsFx],
});

export const $isViewAddButtonCombineData = combine(
  $countCatalogProjects, $catalogProjects, $paginationCurrentPage, $isLoading,
  (countCatalogProjects, catalogProjects,
    paginationCurrentPage, isLoading) => ((catalogProjects.length < crossPagination) && !isLoading)
    || ((countCatalogProjects <= Number(paginationCurrentPage) * crossPagination) && !isLoading),
);
