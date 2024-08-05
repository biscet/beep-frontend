import { sample } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { $pathnameUUID } from 'src/models/App';
import { PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { get, isEmpty } from 'src/lib/lodash';
import {
  $detailProject,
  $isProjectUploadPage,
  getProjectFn,
  getProjectFx,
  goToProjectUploadFn,
  resetDetailProjectFn,
} from '.';
import { crudStoreBehaviorPageFb } from '../..';

$detailProject
  .reset(resetDetailProjectFn)
  .on(getProjectFx.doneData, (_, data) => get(data, PROJECT_FIELDS.PROJECT, {}));

// Перенаправление на загрузку видео / аудио
sample({
  clock: goToProjectUploadFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.UPLOADING}`),
});

// Запрашиваем информацию о проекте
crudStoreBehaviorPageFb({
  $page: $isProjectUploadPage,
  isPageLogic: getProjectFn,
  isNotPageLogic: resetDetailProjectFn,
});

sample({
  clock: getProjectFn,
  source: $pathnameUUID,
  fn: (uuid, prepend) => ({ [PROJECT_FIELDS.ID]: isEmpty(uuid) ? prepend : uuid }),
  target: getProjectFx,
});