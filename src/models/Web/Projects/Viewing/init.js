import { get, isEmpty, isString } from 'src/lib/lodash';
import { PROJECT_FIELDS } from 'src/dict/fields/models/projects';
import { invoke } from '@withease/factories';
import { $pathnameUUID } from 'src/models/App';
import { sample } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { validProjectContract } from 'src/lib/contracts';
import {
  $detailProject, $isProjectPage,
  getProjectBeforeUploadFileFn,
  getProjectBeforeUploadFileFx, getProjectFn, getProjectFx,
  goToProjectFn, resetDetailProjectFn,
} from '.';
import { crudStoreBehaviorPageFb } from '../..';
import { goToProjectsCatalogFn } from '../Catalog';
import { $projectsStatuses } from '..';

$detailProject
  .reset(resetDetailProjectFn)
  .on(getProjectFx.doneData, (_, data) => get(data, PROJECT_FIELDS.PROJECT, {}))
  .on(getProjectBeforeUploadFileFx.doneData, (_, data) => get(data, PROJECT_FIELDS.PROJECT, {}));

// Запрашиваем информацию о проекте
invoke(crudStoreBehaviorPageFb, {
  $page: $isProjectPage,
  isPageLogic: getProjectFn,
  isNotPageLogic: resetDetailProjectFn,
});

sample({
  clock: $projectsStatuses,
  source: $detailProject,
  filter: (project, statuses) => !isEmpty(project) && !isEmpty(statuses),
  fn: (project, statuses) => {
    const id = get(project, PROJECT_FIELDS.ID, '');
    const status = get(statuses, id, '');
    return isEmpty(status) ? project : { ...project, [PROJECT_FIELDS.STATUS]: status };
  },
  target: $detailProject,
});

sample({
  clock: getProjectBeforeUploadFileFn,
  source: $pathnameUUID,
  fn: (uuid, prepend) => ({ [PROJECT_FIELDS.ID]: isString(prepend) ? prepend : uuid }),
  target: getProjectBeforeUploadFileFx,
});

sample({
  clock: getProjectFn,
  source: $pathnameUUID,
  fn: (uuid, prepend) => ({ [PROJECT_FIELDS.ID]: isString(prepend) ? prepend : uuid }),
  target: getProjectFx,
});

// Перенаправление в проект
sample({
  clock: goToProjectFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.VIEWING}`),
});

// Редирект с несущестующего проекта
sample({
  clock: getProjectFx.doneData,
  filter: (data) => validProjectContract(data),
  target: goToProjectsCatalogFn,
});
