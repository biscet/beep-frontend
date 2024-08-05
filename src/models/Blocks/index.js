import { combine } from 'effector';
import {
  CRUD_PATH, PAGES_PATH, SIDEBAR_ROUTES_FIELDS, WEB_PATH,
} from 'src/dict/path';
import { ProjectsSVG, DashboardSVG } from 'src/ui/media/images';
import { allDomain } from '../App';

const {
  NAME, ACTIVE, PATH, GENERAL_PAGE, VALIDATE, ICON,
} = SIDEBAR_ROUTES_FIELDS;

const { CATALOG, UPLOADING } = CRUD_PATH;

const blocksDomain = allDomain.createDomain('Blocks');

export const triggerLogoutFn = blocksDomain.createEvent();

export const setHeaderAnimationStateFn = blocksDomain.createEvent();

export const setIsHovereLogoutFn = blocksDomain.createEvent();

export const $headerAnimationComplete = blocksDomain.createStore(false);

export const $isHovereLogout = blocksDomain.createStore(false);

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
    [NAME]: 'Дашборд',
    [ACTIVE]: false,
    [VALIDATE]: [CATALOG],
    [ICON]: DashboardSVG,
    [PATH]: `/${PAGES_PATH.WEB}/${WEB_PATH.DASHBOARD}/${CATALOG}`,
    [GENERAL_PAGE]: WEB_PATH.DASHBOARD,
  },
].filter(({ [ACTIVE]: active }) => active));