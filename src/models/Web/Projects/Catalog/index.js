import {
  CRUD_PATH, PAGES_PATH, WEB_PATH,
} from 'src/dict/path';
import { getCatalogProjectsSign } from 'src/api/projects';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';
import { combine } from 'effector';
import { projectsDomain } from '..';

const { CATALOG } = CRUD_PATH;

export const resetCatalogProjectsFn = projectsDomain.createEvent();

export const $catalogProjects = projectsDomain.createStore([]);
export const $countCatalogProjects = projectsDomain.createStore(0);

export const getCatalogProjectsFx = projectsDomain.createEffect(getCatalogProjectsSign);

export const $isProjectCatalogPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, CATALOG]),
);

export const $catalogProjectsCombineData = combine($catalogProjects, $countCatalogProjects);