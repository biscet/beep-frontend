import { sample } from 'effector';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import {
  CHUNK_UPLOAD_FIELDS, COMPLETE_UPLOAD_CHUNKS_FIELDS,
  DEFAULT_CHUNK_SIZE, PROJECT_FIELDS,
  TYPES_FIELDS, UPLOADING_FIELDS,
  VALIDATE_FOR_UPLOAD_ERRORS,
  VALIDATE_UNPLOAD_FIELDS,
} from 'src/dict/fields/models/projects';
import { get, isEmpty } from 'src/lib/lodash';
import { notifyErrorFn, notifySuccessFn } from 'src/models/Helpers/Notify';
import { FILE_UPLOADER_FIELDS } from 'src/dict/fields/file-uploader';
import {
  canBeUploadPageContract, chunkUploadContract, chunkUploadResponseContract, completeChunksUploadContract,
} from 'src/lib/contracts';
import { debounce, spread } from 'patronum';
import { createSlicedFile, getFileExtension } from 'src/lib/file';
import { invoke } from '@withease/factories';
import { errorMsgHandler } from 'src/lib/url';
import { DEFAULT_ERROR_MSG } from 'src/dict/config';
import { getMediaDuration } from 'src/lib/media';
import {
  $detailChunks, $etagsChunks, $isProjectUploadPage, $uploadingFile, chunkUploadFx,
  completeChunkUploadFx, confirmSTTFx,
  continueUploadChunksFn, failedChunksFb, goToProjectUploadFn,
  resetChunksFn, setDetailChunksFn, setEtagChunksFn,
  uploadingForm,
  validateForUploadFx,
} from '.';
import {
  $detailProject, getProjectBeforeUploadFileFn, goToProjectFn, resetDetailProjectFn,
} from '../Viewing';

$detailChunks
  .reset(resetChunksFn)
  .on(setDetailChunksFn, (_, detailChunks) => detailChunks);

$etagsChunks
  .reset(resetChunksFn)
  .on(setEtagChunksFn, (etags, etag) => [...etags, etag]);

$uploadingFile
  .reset(resetChunksFn)
  .on(uploadingForm.formValidated, () => true);

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
  fn: async ([values, project]) => {
    const file = get(values, UPLOADING_FIELDS.FILE, {
      [FILE_UPLOADER_FIELDS.FILE]: { size: 0, type: 'video/mp4', name: 'example.mp4' },
    });

    return {
      [VALIDATE_UNPLOAD_FIELDS.DURATION]: await getMediaDuration(file[FILE_UPLOADER_FIELDS.FILE]),
      [VALIDATE_UNPLOAD_FIELDS.PROJECT_ID]: get(project, PROJECT_FIELDS.ID, ''),
      [VALIDATE_UNPLOAD_FIELDS.PROJECT_TYPE]: file[FILE_UPLOADER_FIELDS.FILE].type.split('/')[0].includes('video')
        ? TYPES_FIELDS.VIDEO_MP4 : TYPES_FIELDS.VIDEO_MP3,
    };
  },
  target: validateForUploadFx.prepend(async (data) => data),
});

sample({
  clock: validateForUploadFx.doneData,
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

sample({
  clock: setDetailChunksFn,
  source: setDetailChunksFn,
  filter: (detailChunks) => chunkUploadContract(detailChunks),
  target: chunkUploadFx,
});

sample({
  clock: chunkUploadFx.doneData,
  filter: (data) => chunkUploadResponseContract(data),
  target: continueUploadChunksFn,
});

invoke(failedChunksFb, {
  clock: chunkUploadFx.doneData,
  contract: chunkUploadResponseContract,
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
      ? TYPES_FIELDS.VIDEO_MP4 : TYPES_FIELDS.VIDEO_MP3;

    const body = {
      ...detailChunks,
      [CHUNK_UPLOAD_FIELDS.ETAGS]: [...etagsChunks],
      [CHUNK_UPLOAD_FIELDS.TYPE]: type,
      [CHUNK_UPLOAD_FIELDS.DURATION]: await getMediaDuration(file[FILE_UPLOADER_FIELDS.FILE]),
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
  filter: (_, data) => completeChunksUploadContract(data),
  fn: async ([values, detailChunks, detailProject], data) => {
    const type = get(detailChunks, CHUNK_UPLOAD_FIELDS.EXT_TYPE, 'video') === 'video'
      ? TYPES_FIELDS.VIDEO_MP4 : TYPES_FIELDS.VIDEO_MP3;

    return {
      [COMPLETE_UPLOAD_CHUNKS_FIELDS.DURATION]: await getMediaDuration(
        get(values, UPLOADING_FIELDS.FILE, {})[FILE_UPLOADER_FIELDS.FILE],
      ),
      [COMPLETE_UPLOAD_CHUNKS_FIELDS.CONTENT_LANGUAGEE]: 'RU',
      [COMPLETE_UPLOAD_CHUNKS_FIELDS.FILE_KEY]: get(data, COMPLETE_UPLOAD_CHUNKS_FIELDS.FILE_KEY, null),
      [CHUNK_UPLOAD_FIELDS.PROJECT_ID]: detailChunks[CHUNK_UPLOAD_FIELDS.PROJECT_ID],
      [CHUNK_UPLOAD_FIELDS.TYPE]: type,
      [CHUNK_UPLOAD_FIELDS.OPERATION_ID]: get(detailProject, CHUNK_UPLOAD_FIELDS.OPERATION_ID, ''),
    };
  },
  target: confirmSTTFx.prepend(async (data) => data),
});

invoke(failedChunksFb, {
  clock: completeChunkUploadFx.doneData,
  contract: completeChunksUploadContract,
});

sample({
  clock: confirmSTTFx.doneData,
  target: [
    notifySuccessFn.prepend(() => 'Файл успешно отправлен на обработку.'),
    getProjectBeforeUploadFileFn,
    goToProjectFn.prepend((data) => get(data, PROJECT_FIELDS.ID, '')),
  ],
});

sample({
  clock: debounce({
    source: confirmSTTFx.doneData,
    timeout: 150,
  }),
  target: [
    resetChunksFn,
    uploadingForm.reset,
  ],
});

// Если один запрос пришел с ошибкой, прерывать всю загрузку и выдавать информацию об этом
invoke(failedChunksFb, {
  clock: [
    chunkUploadFx.fail, completeChunkUploadFx.fail,
    confirmSTTFx.fail,
  ],
});

sample({
  clock: validateForUploadFx.fail,
  target: [notifyErrorFn.prepend((error) => {
    let { msg } = errorMsgHandler(error);

    Object.keys(VALIDATE_FOR_UPLOAD_ERRORS).forEach((status) => {
      if (status === msg) {
        msg = VALIDATE_FOR_UPLOAD_ERRORS[msg];
      }
    });

    return msg === DEFAULT_ERROR_MSG ? 'Начать обработку файла не удалось. Попробуйте еще раз.' : msg;
  }),
  resetChunksFn],
});

// Редирект с аплоад страницы, если неправильный статус
sample({
  clock: [$isProjectUploadPage, $detailProject],
  source: [$isProjectUploadPage, $detailProject],
  filter: ([page, data]) => !isEmpty(data) && canBeUploadPageContract({ page, data }),
  fn: ([, data]) => get(data, PROJECT_FIELDS.ID, ''),
  target: goToProjectFn,
});