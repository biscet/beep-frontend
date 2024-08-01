import { sample, split } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { $pathnameUUID } from 'src/models/App';
import { PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { isEmpty } from 'src/lib/lodash';
import {
  $detailProject,
  $isProjectUploadPage,
  getProjectFn,
  getProjectFx,
  goToProjectUploadFn,
  resetDetailProjectFn,
} from '.';

$detailProject
  .reset(resetDetailProjectFn)
  .on(getProjectFx.doneData, (_, project) => project);

// Перенаправление на загрузку видео / аудио
sample({
  clock: goToProjectUploadFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.UPLOADING}`),
});

// Запрашиваем информацию о проекте
split({
  source: $isProjectUploadPage,
  match: {
    isPage: (page) => page,
    isNotPage: (page) => !page,
  },
  cases: {
    isPage: getProjectFn,
    isNotPage: resetDetailProjectFn,
  },
});

sample({
  clock: getProjectFn,
  source: $pathnameUUID,
  fn: (uuid, prepend) => ({ [PROJECT_FIELDS.ID]: isEmpty(uuid) ? prepend : uuid }),
  target: getProjectFx,
});