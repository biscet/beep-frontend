import { sample } from 'effector';
import { debounce } from 'patronum';
import { closeModalFn } from 'src/models/Helpers/Modal';
import { get } from 'src/lib/lodash';
import { CREATE_PROJECT_FIELDS, PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { notifyErrorFn, notifySuccessFn } from 'src/models/Helpers/Notify';
import {
  $createProjectDone,
  $projectsBackground,
  $projectsStatuses,
  createProjectForm,
  createProjectFx,
  setCreateProjectFn,
  setProjectsStatusesFn,
  setProjectsBackgroundFn,
} from '.';
import {
  resetChunksFn, uploadingForm,
} from './Uploading';
import { $isProjectPage, getProjectFn, goToProjectFn } from './Viewing';

$createProjectDone.on(setCreateProjectFn, (_, done) => done);

$projectsStatuses
  .on(setProjectsStatusesFn, (_, projects) => projects);

$projectsBackground
  .on(setProjectsBackgroundFn, (_, projects) => projects);

// Создание проекта
sample({
  clock: createProjectForm.formValidated,
  source: createProjectForm.$values,
  target: [createProjectFx, setCreateProjectFn.prepend(() => true)],
});

sample({
  clock: createProjectFx.doneData,
  source: createProjectForm.$values,
  fn: (values, data) => ({
    [PROJECT_FIELDS.ID]: get(data, CREATE_PROJECT_FIELDS.UUID, ''),
    [PROJECT_FIELDS.NAME]: get(values, CREATE_PROJECT_FIELDS.NAME, ''),
  }),
  target: [
    goToProjectFn.prepend(({ [PROJECT_FIELDS.ID]: uuid }) => uuid),
    notifySuccessFn.prepend(() => 'Проект успешно создан. Вы перенаправлены на страницу загрузки видео.'),
  ],
});

sample({
  clock: createProjectFx.doneData,
  filter: $isProjectPage,
  fn: (data) => data[CREATE_PROJECT_FIELDS.UUID],
  target: [getProjectFn, resetChunksFn, uploadingForm.reset],
});

sample({
  clock: createProjectFx.fail,
  target: [
    notifyErrorFn.prepend(() => 'Создание проекта не удалось. Попробуйте еще раз.'),
    setCreateProjectFn.prepend(() => false),
  ],
});

// Очищение формы после закрытия модалки
sample({
  clock: debounce({
    source: closeModalFn,
    timeout: 200,
  }),
  source: createProjectForm.$isDirty,
  filter: (isDirty) => isDirty,
  target: [createProjectForm.reset, setCreateProjectFn.prepend(() => false)],
});