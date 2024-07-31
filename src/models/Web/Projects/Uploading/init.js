import { sample } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import {
  goToProjectUploadFn,
} from '.';

// Перенаправление на загрузку видео в проекте
sample({
  clock: goToProjectUploadFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.UPLOADING}`),
});
