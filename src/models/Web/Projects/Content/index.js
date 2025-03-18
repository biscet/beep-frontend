import {
  CRUD_PATH, PAGES_PATH, WEB_PATH,
} from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';
import { getFileDetailsSign } from 'src/api/projects';
import { crossPlayerVolume, PLAYER_VOLUME_FIELD, PROJECT_FILE_FIELDS } from 'src/dict/fields/models/projects';
import { playerVolumeContract } from 'src/lib/contracts';
import { persist } from 'effector-storage/local';
import { pending } from 'patronum';
import { projectsDomain } from '..';
import { getProjectFx } from '../Viewing';

const { CONTENT } = CRUD_PATH;

export const goToProjectContentFn = projectsDomain.createEvent();

export const getFilesTriggerFn = projectsDomain.createEvent();
export const resetFilesTriggerFn = projectsDomain.createEvent();

export const setVolumeFn = projectsDomain.createEvent();

export const $playerVolume = projectsDomain.createStore(crossPlayerVolume);

export const $filesContent = projectsDomain.createStore({
  [PROJECT_FILE_FIELDS.AUDIO]: {
    [PROJECT_FILE_FIELDS.TIMESTAMPS]: [],
    [PROJECT_FILE_FIELDS.URL]: '',
  },
  [PROJECT_FILE_FIELDS.VIDEO]: {
    [PROJECT_FILE_FIELDS.TIMESTAMPS]: [],
    [PROJECT_FILE_FIELDS.URL]: '',
  },
  [PROJECT_FILE_FIELDS.TYPE]: false,
});

export const getFileVideoDetailsFx = projectsDomain.createEffect(getFileDetailsSign);
export const getFileAudioDetailsFx = projectsDomain.createEffect(getFileDetailsSign);

export const $isProjectContentPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, CONTENT]),
);

persist({ store: $playerVolume, key: PLAYER_VOLUME_FIELD, contract: playerVolumeContract() });

export const $isLoading = pending({
  effects: [getProjectFx, getFileVideoDetailsFx, getFileAudioDetailsFx],
});