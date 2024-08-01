import { sample, split } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { $pathnameUUID } from 'src/models/App';
import { PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import {
  $detailProject,
  $isProjectUploadPage,
  getProjectFn,
  getProjectFx,
  goToProjectUploadFn,
  resetDetailProjectFn,
} from '.';

$detailProject
  .reset(resetDetailProjectFn);

// Перенаправление на загрузку видео в проекте
sample({
  clock: goToProjectUploadFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.UPLOADING}`),
});

// Запрашиваем список проектов на странице каталога
split({
  source: $isProjectUploadPage,
  match: {
    isPage: (isProjectCatalogPage) => isProjectCatalogPage,
    isNotPage: (isProjectCatalogPage) => !isProjectCatalogPage,
  },
  cases: {
    isPage: getProjectFn,
    isNotPage: resetDetailProjectFn,
  },
});

sample({
  clock: getProjectFn,
  source: $pathnameUUID,
  fn: (uuid) => ({ [PROJECT_FIELDS.ID]: uuid }),
  target: getProjectFx,
});