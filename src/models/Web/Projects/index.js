import { createForm } from 'effector-forms';
import { CREATE_PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { rules } from 'src/lib/rules';
import { combine } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { webDomain } from '..';

const projectsDomain = webDomain.createDomain('Projects');

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

export const $disabledCreateProjectCombineData = combine(createProjectForm.$values, (values) => {
  const {
    [CREATE_PROJECT_FIELDS.NAME]: name,
  } = values;

  return [name].some((field) => isEmpty(field));
});