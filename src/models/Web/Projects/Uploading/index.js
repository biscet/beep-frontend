import {
  CRUD_PATH, PAGES_PATH, WEB_PATH,
} from 'src/dict/path';
import {
  getProjectSign, postCompleteUploadChunkSign, postConfirmSTTSign, postUploadChunkSign,
} from 'src/api/projects';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';
import { UPLOADING_FIELDS } from 'src/dict/fields/models/projects';
import { rules } from 'src/lib/rules';
import { createForm } from 'effector-forms';
import { combine } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { projectsDomain } from '..';

const { UPLOADING } = CRUD_PATH;

export const goToProjectUploadFn = projectsDomain.createEvent();

export const resetDetailProjectFn = projectsDomain.createEvent();
export const getProjectFn = projectsDomain.createEvent();

export const resetChunksFn = projectsDomain.createEvent();
export const setEtagChunksFn = projectsDomain.createEvent();
export const setDetailChunksFn = projectsDomain.createEvent();
export const continueUploadVideoChunksFn = projectsDomain.createEvent();

export const $detailProject = projectsDomain.createStore({});

export const $etagsChunks = projectsDomain.createStore([]);
export const $detailChunks = projectsDomain.createStore({});

export const getProjectFx = projectsDomain.createEffect(getProjectSign);

export const chunkVideoUploadFx = projectsDomain.createEffect(postUploadChunkSign);
export const completeChunkVideoUploadFx = projectsDomain.createEffect(postCompleteUploadChunkSign);
export const confirmSTTFx = projectsDomain.createEffect(postConfirmSTTSign);

export const $isProjectUploadPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, UPLOADING]),
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