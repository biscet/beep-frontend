import {
  CRUD_PATH, PAGES_PATH, WEB_PATH,
} from 'src/dict/path';
import { getProjectSign } from 'src/api/projects';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl } from 'src/models/App';
import { projectsDomain } from '..';

const { UPLOADING } = CRUD_PATH;

export const goToProjectUploadFn = projectsDomain.createEvent();

export const $detailProject = projectsDomain.createStore({});

export const getProjectFx = projectsDomain.createEffect(getProjectSign);

export const $isProjectUploadPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, UPLOADING]),
);
