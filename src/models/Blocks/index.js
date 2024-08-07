import { combine } from 'effector';
import {
  CRUD_PATH, PAGES_PATH, SIDEBAR_ROUTES_FIELDS, WEB_PATH,
} from 'src/dict/path';
import { ProjectsSVG, PresetsSVG } from 'src/ui/media/images';
import { rootContainer } from 'src/dict/config';
import { allDomain } from '../App';

const {
  NAME, ACTIVE, PATH, GENERAL_PAGE, VALIDATE, ICON,
} = SIDEBAR_ROUTES_FIELDS;

const { CATALOG, UPLOADING } = CRUD_PATH;

const blocksDomain = allDomain.createDomain('Blocks');

export const triggerLogoutFn = blocksDomain.createEvent();

export const setHeaderAnimationStateFn = blocksDomain.createEvent();

export const setScrolledRootFn = blocksDomain.createEvent();

export const setIsHoveredLogoutFn = blocksDomain.createEvent();

export const $scrolledRoot = blocksDomain.createStore(false);

export const $headerAnimationComplete = blocksDomain.createStore(false);

export const $isHoveredLogout = blocksDomain.createStore(false);

export const $sidebarRoutes = combine(() => [
  {
    [NAME]: 'Проекты',
    [ACTIVE]: true,
    [VALIDATE]: [CATALOG, UPLOADING],
    [ICON]: ProjectsSVG,
    [PATH]: `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${CATALOG}?page=1`,
    [GENERAL_PAGE]: WEB_PATH.PROJECTS,
  },
  {
    [NAME]: 'Предустановки',
    [ACTIVE]: true,
    [VALIDATE]: [CATALOG],
    [ICON]: PresetsSVG,
    [PATH]: `/${PAGES_PATH.WEB}/${WEB_PATH.PRESETS}/${CATALOG}?page=1`,
    [GENERAL_PAGE]: WEB_PATH.PRESETS,
  },
].filter(({ [ACTIVE]: active }) => active));

export const rootScrolledEvent = () => {
  if (rootContainer.scrollTop > 0) {
    setScrolledRootFn(true);
  }

  if (rootContainer.scrollTop === 0) {
    setScrolledRootFn(false);
  }
};