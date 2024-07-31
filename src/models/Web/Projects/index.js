import { createForm } from 'effector-forms';
import { CREATE_PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { rules } from 'src/lib/rules';
import { combine } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import {
  CRUD_PATH, PAGES_PATH, ROUTES_FIELDS, WEB_PATH,
} from 'src/dict/path';
import { postCreateProjectSign, getCatalogProjectsSign } from 'src/api/projects';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';
import { webDomain } from '..';

const { PATH, ACTIVE } = ROUTES_FIELDS;
const { CATALOG, UPLOADING } = CRUD_PATH;

const projectsDomain = webDomain.createDomain('Projects');

export const goToProjectUploadFn = projectsDomain.createEvent();

export const resetCatalogProjectsFn = projectsDomain.createEvent();

export const $catalogProjects = projectsDomain.createStore([]);
export const $countCatalogProjects = projectsDomain.createStore(0);

export const createProjectFx = projectsDomain.createEffect(postCreateProjectSign);
export const getProjectsFx = projectsDomain.createEffect(getCatalogProjectsSign);

export const $isProjectCatalogPage = combine($pathnameUrl,
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, CATALOG]));

export const $itemsRoutesProjects = combine(() => [
  {
    [PATH]: CATALOG,
    [ACTIVE]: true,
  },
  {
    [PATH]: UPLOADING,
    [ACTIVE]: true,
  },
].filter(({ [ACTIVE]: active }) => active));

export const createProjectForm = createForm({
  fields: {
    [CREATE_PROJECT_FIELDS.NAME]: {
      rules: [rules.required(), rules.projectName()],
      init: '',
    },
    [CREATE_PROJECT_FIELDS.TYPE]: {
      init: 'beep_mp4',
    },
  },
  validateOn: ['submit'],
  domain: projectsDomain,
});

export const $disabledCreateProjectCombineData = combine(createProjectForm.$values, (values) => {
  const {
    [CREATE_PROJECT_FIELDS.NAME]: name,
  } = values;

  return [name].some((field) => isEmpty(field));
});