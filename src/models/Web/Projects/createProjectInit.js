import { sample } from 'effector';
import { debounce } from 'patronum';
import { closeModalFn } from 'src/models/Helpers/Modal';
import { createProjectForm } from '.';

sample({
  clock: createProjectForm.formValidated,
  source: createProjectForm.$values,
  fn: (values) => {
    console.log(values);
  },
});

sample({
  clock: debounce({
    source: closeModalFn,
    timeout: 150,
  }),
  source: createProjectForm.$isDirty,
  filter: (isDirty) => isDirty,
  target: createProjectForm.reset,
});