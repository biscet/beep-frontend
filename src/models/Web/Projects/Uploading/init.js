import { createEffect, sample, split } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import {
  CHUNK_UPLOAD_FIELDS, DEFAULT_CHUNK_SIZE, PROJECT_FIELDS, UPLOADING_FIELDS,
} from 'src/dict/fields/models/projects';
import { get } from 'src/lib/lodash';
import { notifyErrorFn } from 'src/models/Helpers/Notify';
import { FILE_UPLOADER_FIELDS } from 'src/dict/fields/file-uploader';
import { chunkUploadContract, chunkUploadResponseContract } from 'src/lib/contracts';
import { spread } from 'patronum';
import { getMediaDuration, createSlicedFile } from 'src/lib/helpers';
import {
  $detailChunks, $etagsChunks, chunkVideoUploadFx,
  completeChunkVideoUploadFx, confirmSTTFx,
  continueUploadVideoChunksFn, goToProjectUploadFn,
  resetChunksFn, setDetailChunksFn, setEtagChunksFn,
  uploadingForm,
} from '.';
import { $detailProject, resetDetailProjectFn } from '../Viewing';

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

    const ext = file[FILE_UPLOADER_FIELDS.FILE].type.split('/');
    const name = file[FILE_UPLOADER_FIELDS.FILE].name.replace(`.${ext[1]}`, '');

    return {
      [CHUNK_UPLOAD_FIELDS.TOTAL_CHUNKS]: Math.ceil(
        file[FILE_UPLOADER_FIELDS.FILE].size / DEFAULT_CHUNK_SIZE,
      ),
      [CHUNK_UPLOAD_FIELDS.INDEX]: 0,
      [CHUNK_UPLOAD_FIELDS.PROJECT_ID]: get(project, PROJECT_FIELDS.ID, ''),
      [CHUNK_UPLOAD_FIELDS.EXT]: ext[1],
      [CHUNK_UPLOAD_FIELDS.EXT_TYPE]: ext[0],
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
    video: chunkVideoUploadFx,
    audio: createEffect(() => { console.log('audio'); }),
  },
});

sample({
  clock: chunkVideoUploadFx.doneData,
  filter: (data) => chunkUploadResponseContract(data),
  target: continueUploadVideoChunksFn,
});

sample({
  clock: continueUploadVideoChunksFn,
  source: [uploadingForm.$values, $detailChunks],
  filter: ([, detailChunks]) => (
    (detailChunks[CHUNK_UPLOAD_FIELDS.INDEX] + 1) < detailChunks[CHUNK_UPLOAD_FIELDS.TOTAL_CHUNKS]
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
  clock: continueUploadVideoChunksFn,
  source: [uploadingForm.$values, $detailChunks, $etagsChunks, $detailProject],
  filter: ([, detailChunks]) => (
    (detailChunks[CHUNK_UPLOAD_FIELDS.INDEX] + 1) === detailChunks[CHUNK_UPLOAD_FIELDS.TOTAL_CHUNKS]
  ),
  fn: async ([values, detailChunks, etagsChunks, detailProject], data) => {
    const file = get(values, UPLOADING_FIELDS.FILE, {});
    const body = {
      ...detailChunks,
      [CHUNK_UPLOAD_FIELDS.ETAGS]: [...etagsChunks, get(data, CHUNK_UPLOAD_FIELDS.ETAGS, {})],
      [CHUNK_UPLOAD_FIELDS.WAV_ID]: get(data, CHUNK_UPLOAD_FIELDS.WAV_ID, ''),
      [CHUNK_UPLOAD_FIELDS.USER_ID]: get(data, CHUNK_UPLOAD_FIELDS.USER_ID, ''),
      [CHUNK_UPLOAD_FIELDS.STT_ID]: get(data, CHUNK_UPLOAD_FIELDS.STT_ID, ''),
      [CHUNK_UPLOAD_FIELDS.VIDEO_DURATION]: await getMediaDuration(file[FILE_UPLOADER_FIELDS.FILE]),
      [CHUNK_UPLOAD_FIELDS.OPERATION_ID]: get(detailProject, 'operation_id', ''),
    };

    delete body[CHUNK_UPLOAD_FIELDS.FILE];
    delete body[CHUNK_UPLOAD_FIELDS.INDEX];

    return body;
  },
  target: completeChunkVideoUploadFx.prepend(async (data) => data),
});

sample({
  clock: completeChunkVideoUploadFx.doneData,
  source: [uploadingForm.$values, $detailChunks, $etagsChunks],
  fn: async (values, detailChunks) => ({
    duration: await getMediaDuration(get(values, UPLOADING_FIELDS.FILE, {})[FILE_UPLOADER_FIELDS.FILE]),
    project_id: detailChunks[CHUNK_UPLOAD_FIELDS.PROJECT_ID],
    project_type: detailChunks[CHUNK_UPLOAD_FIELDS.PROJECT_TYPE],
  }),
  target: confirmSTTFx.prepend(async (data) => data),
});

sample({
  clock: [chunkVideoUploadFx.fail, completeChunkVideoUploadFx.fail, confirmSTTFx.fail],
  target: [
    notifyErrorFn.prepend(() => 'Начать обработку файла не удалось. Попробуйте еще раз.'),
    resetChunksFn,
  ],
});