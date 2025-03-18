import {
  CRUD_PATH, PAGES_PATH, WEB_PATH,
} from 'src/dict/path';
import {
  postCompleteUploadChunkSign,
  postConfirmSTTSign, postUploadChunkSign,
  postValidateForUploadSign,
} from 'src/api/projects';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';
import { CHUNK_UPLOAD_FIELDS, UPLOADING_FIELDS } from 'src/dict/fields/models/projects';
import { rules } from 'src/lib/rules';
import { createForm } from 'effector-forms';
import { combine, sample } from 'effector';
import { get, isEmpty } from 'src/lib/lodash';
import { notifyErrorFn } from 'src/models/Helpers/Notify';
import { createFactory } from '@withease/factories';
import { projectsDomain } from '..';

const { UPLOADING } = CRUD_PATH;

export const goToProjectUploadFn = projectsDomain.createEvent();

export const resetChunksFn = projectsDomain.createEvent();
export const setEtagChunksFn = projectsDomain.createEvent();
export const setDetailChunksFn = projectsDomain.createEvent();
export const continueUploadChunksFn = projectsDomain.createEvent();

export const $etagsChunks = projectsDomain.createStore([]);
export const $detailChunks = projectsDomain.createStore({});

export const $uploadingFile = projectsDomain.createStore(false);

export const validateForUploadFx = projectsDomain.createEffect(postValidateForUploadSign);
export const chunkUploadFx = projectsDomain.createEffect(postUploadChunkSign);
export const completeChunkUploadFx = projectsDomain.createEffect(postCompleteUploadChunkSign);
export const confirmSTTFx = projectsDomain.createEffect(postConfirmSTTSign);

export const $isProjectUploadPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, UPLOADING]),
);

export const $totalChunksForFile = $detailChunks.map(
  (data) => get(data, CHUNK_UPLOAD_FIELDS.TOTAL_CHUNKS, 0),
);

export const uploadingForm = createForm({
  fields: {
    [UPLOADING_FIELDS.FILE]: {
      rules: [rules.required(), rules.fileVideoSize(), rules.fileAudioSize()],
      init: '',
      validateOn: ['change'],
    },
  },
  validateOn: ['submit'],
  domain: projectsDomain,
});

export const $disabledUploadingProjectCombineData = combine(uploadingForm.$values, (values) => {
  const {
    [UPLOADING_FIELDS.FILE]: file,
  } = values;

  return [file].some((field) => isEmpty(field));
});

export const failedChunksFb = createFactory(({ contract, clock }) => {
  sample({
    clock,
    filter: (data) => (isEmpty(contract) ? true : !contract(data)),
    target: [
      notifyErrorFn.prepend(() => 'Начать обработку файла не удалось. Попробуйте еще раз.'),
      resetChunksFn,
    ],
  });
});