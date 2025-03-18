import { sample, split } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import {
  BACKEND_PROJECT_STATUS_FIELDS, CONTENT_PLAYER_TYPE_FIELDS,
  GET_PROJECT_FILE_FIELDS, PROJECT_FIELDS,
  PROJECT_FILE_FIELDS, TYPES_FIELDS,
} from 'src/dict/fields/models/projects';
import { get, isEmpty } from 'src/lib/lodash';
import { canBeContentPageContract } from 'src/lib/contracts';
import { debounce } from 'patronum';
import {
  $filesContent, getFileAudioDetailsFx,
  $isProjectContentPage, getFileVideoDetailsFx,
  getFilesTriggerFn, goToProjectContentFn,
  resetFilesTriggerFn,
  $playerVolume,
  setVolumeFn,
} from '.';
import { $detailProject, goToProjectFn } from '../Viewing';

const { DONE, CREATED } = BACKEND_PROJECT_STATUS_FIELDS;
const { STATUS, ID, TYPE } = PROJECT_FIELDS;

$playerVolume.on(setVolumeFn, (_, volume) => volume);

$filesContent
  .reset(resetFilesTriggerFn)
  .on(getFileVideoDetailsFx.doneData, (files, newFile) => {
    const data = { ...files };
    data[PROJECT_FILE_FIELDS.VIDEO] = {
      [PROJECT_FILE_FIELDS.TIMESTAMPS]: get(newFile, PROJECT_FILE_FIELDS.TIMESTAMPS, []),
      [PROJECT_FILE_FIELDS.URL]: get(newFile, PROJECT_FILE_FIELDS.URL, ''),
      [PROJECT_FILE_FIELDS.PEAKS]: get(newFile, PROJECT_FILE_FIELDS.PEAKS, ''),
    };

    data[PROJECT_FILE_FIELDS.TYPE] = CONTENT_PLAYER_TYPE_FIELDS.VIDEO;

    return data;
  })
  .on(getFileAudioDetailsFx.doneData, (files, newFile) => {
    const data = { ...files };
    data[PROJECT_FILE_FIELDS.AUDIO] = {
      [PROJECT_FILE_FIELDS.TIMESTAMPS]: get(newFile, PROJECT_FILE_FIELDS.TIMESTAMPS, []),
      [PROJECT_FILE_FIELDS.URL]: get(newFile, PROJECT_FILE_FIELDS.URL, ''),
      [PROJECT_FILE_FIELDS.PEAKS]: get(newFile, PROJECT_FILE_FIELDS.PEAKS, ''),
    };

    data[PROJECT_FILE_FIELDS.TYPE] = CONTENT_PLAYER_TYPE_FIELDS.AUDIO;

    return data;
  });

// Перенаправление на посмотр файлов
sample({
  clock: goToProjectContentFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.CONTENT}`),
});

sample({
  clock: debounce({ source: $isProjectContentPage, timeout: 150 }),
  source: $isProjectContentPage,
  filter: (page) => !page,
  target: resetFilesTriggerFn,
});

// Загрузка файлов от проекта
sample({
  source: [$detailProject, $isProjectContentPage],
  filter: ([detailProject, page]) => (
    !isEmpty(detailProject) && get(detailProject, STATUS, CREATED) === DONE && page
  ),
  target: getFilesTriggerFn,
});

split({
  clock: getFilesTriggerFn,
  source: $detailProject,
  match: {
    video: (detailProject) => get(detailProject, TYPE) === TYPES_FIELDS.VIDEO,
    audio: (detailProject) => get(detailProject, TYPE) === TYPES_FIELDS.AUDIO,
  },
  cases: {
    video: [
      getFileVideoDetailsFx.prepend((detailProject) => ({
        [GET_PROJECT_FILE_FIELDS.PROJECT_ID]: get(detailProject, ID),
        [GET_PROJECT_FILE_FIELDS.FILE_TYPE]: TYPES_FIELDS.FILE_VIDEO,
      })),
    ],
    audio: getFileAudioDetailsFx.prepend((detailProject) => ({
      [GET_PROJECT_FILE_FIELDS.PROJECT_ID]: get(detailProject, ID),
      [GET_PROJECT_FILE_FIELDS.FILE_TYPE]: TYPES_FIELDS.FILE_AUDIO,
    })),
  },
});

// Редирект с просмотр страницы, если неправильный статус
sample({
  clock: [$isProjectContentPage, $detailProject],
  source: [$isProjectContentPage, $detailProject],
  filter: ([page, data]) => !isEmpty(data) && canBeContentPageContract({ page, data }),
  fn: ([, data]) => get(data, ID, ''),
  target: goToProjectFn,
});
