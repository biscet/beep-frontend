import { combine } from 'effector';
import {
  CRUD_PATH, PAGES_PATH, SIDEBAR_ROUTES_FIELDS, WEB_PATH,
} from 'src/dict/path';
import { ProjectsSVG, StaffSVG } from 'src/ui/media/images';
import { rootContainer } from 'src/dict/config';
import { allDomain } from '../App';
import { $isProjectCatalogPage } from '../Web/Projects/Catalog';

const {
  NAME, ACTIVE, PATH, GENERAL_PAGE, VALIDATE, ICON,
} = SIDEBAR_ROUTES_FIELDS;

const {
  CATALOG, UPLOADING, VIEWING, CONTENT,
} = CRUD_PATH;

const blocksDomain = allDomain.createDomain('Blocks');

export const triggerLogoutFn = blocksDomain.createEvent();

export const setHeaderAnimationStateFn = blocksDomain.createEvent();

export const setScrolledRootFn = blocksDomain.createEvent();

export const setIsHoveredLogoutFn = blocksDomain.createEvent();

export const $scrolledRoot = blocksDomain.createStore(false);

export const $headerAnimationComplete = blocksDomain.createStore(false);

export const $isHoveredLogout = blocksDomain.createStore(false);

export const $webLayoutPaddingCondition = blocksDomain.createStore(false);

export const $webLayoutPaddingConditionCombineData = combine(
  $isProjectCatalogPage, (isProjectCatalogPage) => [isProjectCatalogPage],
);

export const $sidebarRoutes = combine(() => [
  {
    [NAME]: 'Проекты',
    [ACTIVE]: true,
    [VALIDATE]: [CATALOG, UPLOADING, VIEWING, CONTENT],
    [ICON]: ProjectsSVG,
    [PATH]: `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${CATALOG}?page=1`,
    [GENERAL_PAGE]: WEB_PATH.PROJECTS,
  },
  {
    [NAME]: 'Шаблоны',
    [ACTIVE]: false,
    [VALIDATE]: [CATALOG],
    [ICON]: StaffSVG,
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