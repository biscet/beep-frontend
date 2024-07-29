import { combine } from 'effector';
import { PAGES_PATH, SIDEBAR_ROUTES_FIELDS, WEB_PATH } from 'src/dict/path';
import { ProjectsSVG, DashboardSVG } from 'src/ui/media/images';
import { allDomain } from '../App';

const {
  NAME, ACTIVE, PATH, GENERAL_PAGE, VALIDATE, ICON,
} = SIDEBAR_ROUTES_FIELDS;

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
    [VALIDATE]: [],
    [ICON]: ProjectsSVG,
    [PATH]: `/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}`,
    [GENERAL_PAGE]: PAGES_PATH.WEB,
  },
  {
    [NAME]: 'Дашборд',
    [ACTIVE]: true,
    [VALIDATE]: [],
    [ICON]: DashboardSVG,
    [PATH]: `/${PAGES_PATH.WEB}/${WEB_PATH.DASHBOARD}`,
    [GENERAL_PAGE]: PAGES_PATH.WEB,
  },
].filter(({ [ACTIVE]: active }) => active));