import { sample } from 'effector';
import { debounce } from 'patronum';
import { closeModalFn } from 'src/models/Helpers/Modal';
import { get } from 'src/lib/lodash';
import { CREATE_PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { notifyErrorFn, notifySuccessFn } from 'src/models/Helpers/Notify';
import {
  $createProjectDone,
  createProjectForm,
  createProjectFx,
  setCreateProjectFn,
} from '.';
import { goToProjectUploadFn } from './Uploading';

$createProjectDone.on(setCreateProjectFn, (_, done) => done);

// Создание проекта
sample({
  clock: createProjectForm.formValidated,
  source: createProjectForm.$values,
  target: [createProjectFx, setCreateProjectFn.prepend(() => true)],
});

sample({
  clock: createProjectFx.doneData,
  fn: (data) => get(data, CREATE_PROJECT_FIELDS.UUID, ''),
  target: [
    goToProjectUploadFn,
    notifySuccessFn.prepend(() => 'Проект успешно создан. Вы перенаправлены на страницу загрузки видео.'),
  ],
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