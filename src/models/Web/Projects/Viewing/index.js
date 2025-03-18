import { getProjectSign } from 'src/api/projects';
import { $pathnameUrl } from 'src/models/App';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { isCurrentPath } from 'src/lib/url';
import { pending } from 'patronum';
import { projectsDomain } from '..';

const { UPLOADING, VIEWING, CONTENT } = CRUD_PATH;

export const goToProjectFn = projectsDomain.createEvent();

export const resetDetailProjectFn = projectsDomain.createEvent();
export const getProjectFn = projectsDomain.createEvent();
export const getProjectBeforeUploadFileFn = projectsDomain.createEvent();

export const $detailProject = projectsDomain.createStore({});

export const getProjectFx = projectsDomain.createEffect(getProjectSign);
export const getProjectBeforeUploadFileFx = projectsDomain.createEffect(getProjectSign);

export const $isProjectPage = $pathnameUrl.map((path) => [UPLOADING, VIEWING, CONTENT].some(
  (crud) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PROJECTS, crud]),
));

export const $isLoading = pending({
  effects: [getProjectFx],
});