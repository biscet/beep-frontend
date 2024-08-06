import { createForm } from 'effector-forms';
import { CREATE_PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { rules } from 'src/lib/rules';
import { combine } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import {
  CRUD_PATH, ROUTES_FIELDS,
} from 'src/dict/path';
import { postCreateProjectSign } from 'src/api/projects';
import { webDomain } from '..';

const { PATH, ACTIVE } = ROUTES_FIELDS;
const { CATALOG, UPLOADING } = CRUD_PATH;

export const projectsDomain = webDomain.createDomain('Projects');

export const setCreateProjectFn = projectsDomain.createEvent();

export const $createProjectDone = projectsDomain.createStore(false);

export const createProjectFx = projectsDomain.createEffect(postCreateProjectSign);

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
  },
  validateOn: ['submit'],
  domain: projectsDomain,
});

export const $disabledCreateProjectCombineData = combine(
  createProjectForm.$values, $createProjectDone, (values, fxDone) => {
    const {
      [CREATE_PROJECT_FIELDS.NAME]: name,
    } = values;

    return ([name].some((field) => isEmpty(field)) || fxDone);
  },
);