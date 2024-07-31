import { sample, split } from 'effector';
import { debounce } from 'patronum';
import { closeModalFn } from 'src/models/Helpers/Modal';
import { get } from 'src/lib/lodash';
import { CREATE_PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { notifyErrorFn, notifySuccessFn } from 'src/models/Helpers/Notify';
import {
  $catalogProjects, $countCatalogProjects,
  $isProjectCatalogPage, createProjectForm,
  createProjectFx, getProjectsFx,
  goToProjectUploadFn, resetCatalogProjectsFn,
} from '.';

$catalogProjects
  .reset(resetCatalogProjectsFn);

$countCatalogProjects
  .reset(resetCatalogProjectsFn);

// Запрашиваем список проектов на странице каталога
split({
  source: $isProjectCatalogPage,
  match: {
    isPage: (isProjectCatalogPage) => isProjectCatalogPage,
    isNotPage: (isProjectCatalogPage) => !isProjectCatalogPage,
  },
  cases: {
    isPage: getProjectsFx,
    isNotPage: resetCatalogProjectsFn,
  },
});

// Создание проекта
sample({
  clock: createProjectForm.formValidated,
  source: createProjectForm.$values,
  target: createProjectFx,
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
  target: notifyErrorFn.prepend(() => 'Создание проекта не удалось. Попробуйте еще раз.'),
});

// Перенаправление на загрузку видео в проекте
sample({
  clock: goToProjectUploadFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.UPLOADING}`),
});

// Очищение формы после закрытия модалки
sample({
  clock: debounce({
    source: closeModalFn,
    timeout: 150,
  }),
  source: createProjectForm.$isDirty,
  filter: (isDirty) => isDirty,
  target: createProjectForm.reset,
});