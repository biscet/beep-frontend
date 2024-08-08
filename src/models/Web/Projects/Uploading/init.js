import { sample, split } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import {
  CHUNK_UPLOAD_FIELDS, DEFAULT_CHUNK_SIZE, PROJECT_FIELDS, UPLOADING_FIELDS,
} from 'src/dict/fields/models/projects';
import { get } from 'src/lib/lodash';
import { notifyErrorFn } from 'src/models/Helpers/Notify';
import { FILE_UPLOADER_FIELDS } from 'src/dict/fields/file-uploader';
import { canBeUploadPageContract, chunkUploadContract, chunkUploadResponseContract } from 'src/lib/contracts';
import { spread } from 'patronum';
import { getMediaDuration, createSlicedFile, getFileExtension } from 'src/lib/helpers';
import {
  $detailChunks, $etagsChunks, $isProjectUploadPage, chunkUploadFx,
  completeChunkUploadFx, confirmSTTFx,
  continueUploadChunksFn, goToProjectUploadFn,
  resetChunksFn, setDetailChunksFn, setEtagChunksFn,
  uploadingForm,
} from '.';
import { $detailProject, goToProjectFn, resetDetailProjectFn } from '../Viewing';

$detailChunks
  .reset(resetChunksFn)
  .on(setDetailChunksFn, (_, detailChunks) => detailChunks);

$etagsChunks
  .reset(resetChunksFn)
  .on(setEtagChunksFn, (etags, etag) => [...etags, etag]);

// Перенаправление на загрузку видео / аудио
sample({
  clock: goToProjectUploadFn,
  target: pushHistoryFn.prepend((id) => `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${id}/${CRUD_PATH.UPLOADING}`),
});

// Очищая проект, очищаем информацию о чанках и форму
sample({
  clock: resetDetailProjectFn,
  target: [resetChunksFn, uploadingForm.reset],
});

// Загрузка файла
sample({
  clock: uploadingForm.formValidated,
  source: [uploadingForm.$values, $detailProject],
  fn: ([values, project]) => {
    const file = get(values, UPLOADING_FIELDS.FILE, {
      [FILE_UPLOADER_FIELDS.FILE]: { size: 0, type: 'video/mp4', name: 'example.mp4' },
    });

    const { ext, name } = getFileExtension(file[FILE_UPLOADER_FIELDS.FILE].name);

    return {
      [CHUNK_UPLOAD_FIELDS.TOTAL_CHUNKS]: Math.ceil(
        file[FILE_UPLOADER_FIELDS.FILE].size / DEFAULT_CHUNK_SIZE,
      ),
      [CHUNK_UPLOAD_FIELDS.INDEX]: 0,
      [CHUNK_UPLOAD_FIELDS.PROJECT_ID]: get(project, PROJECT_FIELDS.ID, ''),
      [CHUNK_UPLOAD_FIELDS.EXT]: ext,
      [CHUNK_UPLOAD_FIELDS.EXT_TYPE]: file[FILE_UPLOADER_FIELDS.FILE].type.split('/')[0],
      [CHUNK_UPLOAD_FIELDS.NAME]: name,
      [CHUNK_UPLOAD_FIELDS.FILE]: createSlicedFile(file[FILE_UPLOADER_FIELDS.FILE], 0),
    };
  },
  target: setDetailChunksFn,
});

split({
  source: setDetailChunksFn,
  match: {
    video: (detailChunks) => chunkUploadContract(detailChunks)
    && detailChunks[CHUNK_UPLOAD_FIELDS.EXT_TYPE] === 'video',
    audio: (detailChunks) => chunkUploadContract(detailChunks)
    && detailChunks[CHUNK_UPLOAD_FIELDS.EXT_TYPE] === 'audio',
  },
  cases: {
    video: chunkUploadFx,
    audio: chunkUploadFx,
  },
});

sample({
  clock: chunkUploadFx.doneData,
  filter: (data) => chunkUploadResponseContract(data),
  target: continueUploadChunksFn,
});

sample({
  clock: continueUploadChunksFn,
  source: [uploadingForm.$values, $detailChunks],
  filter: ([, detailChunks]) => (
    detailChunks[CHUNK_UPLOAD_FIELDS.INDEX] < detailChunks[CHUNK_UPLOAD_FIELDS.TOTAL_CHUNKS]
  ),
  fn: ([values, detailChunks], data) => {
    const file = get(values, UPLOADING_FIELDS.FILE, {});
    const chunkIndex = get(detailChunks, CHUNK_UPLOAD_FIELDS.INDEX, 0) + 1;
    const startChunk = chunkIndex * DEFAULT_CHUNK_SIZE;

    return ({
      etags: get(data, CHUNK_UPLOAD_FIELDS.ETAGS, {}),
      chunk: {
        ...detailChunks,
        [CHUNK_UPLOAD_FIELDS.INDEX]: chunkIndex,
        [CHUNK_UPLOAD_FIELDS.USER_ID]: get(
          detailChunks,
          CHUNK_UPLOAD_FIELDS.USER_ID,
          get(data, CHUNK_UPLOAD_FIELDS.USER_ID, ''),
        ),
        [CHUNK_UPLOAD_FIELDS.FILE]: createSlicedFile(file[FILE_UPLOADER_FIELDS.FILE], startChunk),
      },
    });
  },
  target: spread({
    targets: {
      etags: setEtagChunksFn,
      chunk: setDetailChunksFn,
    },
  }),
});

sample({
  clock: continueUploadChunksFn,
  source: [uploadingForm.$values, $detailChunks, $etagsChunks, $detailProject],
  filter: ([, detailChunks]) => (
    detailChunks[CHUNK_UPLOAD_FIELDS.INDEX] >= detailChunks[CHUNK_UPLOAD_FIELDS.TOTAL_CHUNKS]
  ),
  fn: async ([values, detailChunks, etagsChunks, detailProject]) => {
    const file = get(values, UPLOADING_FIELDS.FILE, {});
    const type = get(detailChunks, CHUNK_UPLOAD_FIELDS.EXT_TYPE, 'video') === 'video'
      ? 'beep_mp4' : 'beep_mp3';

    const body = {
      ...detailChunks,
      [CHUNK_UPLOAD_FIELDS.ETAGS]: [...etagsChunks],
      [CHUNK_UPLOAD_FIELDS.TYPE]: type,
      [CHUNK_UPLOAD_FIELDS.VIDEO_DURATION]: await getMediaDuration(file[FILE_UPLOADER_FIELDS.FILE]),
      [CHUNK_UPLOAD_FIELDS.OPERATION_ID]: get(detailProject, PROJECT_FIELDS.OPERATION_ID, ''),
    };

    delete body[CHUNK_UPLOAD_FIELDS.FILE];
    delete body[CHUNK_UPLOAD_FIELDS.INDEX];

    return body;
  },
  target: completeChunkUploadFx.prepend(async (data) => data),
});

sample({
  clock: completeChunkUploadFx.doneData,
  source: [uploadingForm.$values, $detailChunks, $detailProject],
  fn: async ([values, detailChunks, detailProject]) => {
    const type = get(detailChunks, CHUNK_UPLOAD_FIELDS.EXT_TYPE, 'video') === 'video'
      ? 'beep_mp4' : 'beep_mp3';

    return {
      duration: await getMediaDuration(
        get(values, UPLOADING_FIELDS.FILE, {})[FILE_UPLOADER_FIELDS.FILE],
      ),
      [CHUNK_UPLOAD_FIELDS.PROJECT_ID]: detailChunks[CHUNK_UPLOAD_FIELDS.PROJECT_ID],
      [CHUNK_UPLOAD_FIELDS.TYPE]: type,
      [CHUNK_UPLOAD_FIELDS.OPERATION_ID]: get(detailProject, 'operation_id', ''),
    };
  },
  target: confirmSTTFx.prepend(async (data) => data),
});

sample({
  clock: [chunkUploadFx.fail, completeChunkUploadFx.fail, confirmSTTFx.fail],
  target: [
    notifyErrorFn.prepend(() => 'Начать обработку файла не удалось. Попробуйте еще раз.'),
    resetChunksFn,
  ],
});

// Редирект с аплоад страницы, если неправильный статус
sample({
  clock: $detailProject,
  source: $isProjectUploadPage,
  filter: (page, data) => canBeUploadPageContract({ page, data }),
  fn: (_, data) => get(data, PROJECT_FIELDS.ID, ''),
  target: goToProjectFn,
});
