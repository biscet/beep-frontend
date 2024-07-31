import { combine } from 'effector';
import { BREAD_CRUMBS_FIELD, BREAD_CRUMBS_ROUTE } from 'src/dict/breadcrumbs';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { $pathnameUUID, allDomain } from 'src/models/App';

const {
  PATH, NAME, ACTIVE, VISIBLE, LINK, TRANSLATE,
} = BREAD_CRUMBS_FIELD;

const breadCrumbsDomain = allDomain.createDomain('BreadCrumbs');

export const setCurrentBCFn = breadCrumbsDomain.createEvent();
export const resetCurrentBCFn = breadCrumbsDomain.createEvent();
export const triggerSplitBCLogicFn = breadCrumbsDomain.createEvent();

export const $currentBreadCrumbs = breadCrumbsDomain.createStore({
  [BREAD_CRUMBS_ROUTE.PATH]: '/',
  [BREAD_CRUMBS_ROUTE.VISIBLE]: true,
  [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: [{
    [PATH]: '/',
    [NAME]: '-',
    [ACTIVE]: true,
    [LINK]: '',
    [VISIBLE]: true,
    [TRANSLATE]: true,
  }],
});

export const $webDashboardBC = combine($pathnameUUID, (pathnameUUID) => ([{
  [BREAD_CRUMBS_ROUTE.PATH]: [PAGES_PATH.WEB, WEB_PATH.DASHBOARD, CRUD_PATH.CATALOG],
  [BREAD_CRUMBS_ROUTE.VISIBLE]: true,
  [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: [
    {
      [PATH]: CRUD_PATH.CATALOG,
      [NAME]: 'Дашборд',
      [ACTIVE]: true,
      [LINK]: '',
      [VISIBLE]: true,
      [TRANSLATE]: true,
    },
  ].filter(({ [VISIBLE]: visible }) => visible),
},
{
  [BREAD_CRUMBS_ROUTE.PATH]: [PAGES_PATH.WEB, WEB_PATH.PROJECTS, CRUD_PATH.CATALOG],
  [BREAD_CRUMBS_ROUTE.VISIBLE]: true,
  [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: [
    {
      [PATH]: CRUD_PATH.CATALOG,
      [NAME]: 'Проекты',
      [ACTIVE]: true,
      [LINK]: '',
      [VISIBLE]: true,
      [TRANSLATE]: true,
    },
  ].filter(({ [VISIBLE]: visible }) => visible),
},
{
  [BREAD_CRUMBS_ROUTE.PATH]: [PAGES_PATH.WEB, WEB_PATH.PROJECTS, CRUD_PATH.UPLOADING],
  [BREAD_CRUMBS_ROUTE.VISIBLE]: true,
  [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: [
    {
      [PATH]: CRUD_PATH.CATALOG,
      [NAME]: `${pathnameUUID}123123`,
      [ACTIVE]: true,
      [LINK]: '',
      [VISIBLE]: true,
      [TRANSLATE]: true,
    },
    {
      [PATH]: CRUD_PATH.UPLOADING,
      [NAME]: 'Загрузка файла',
      [ACTIVE]: true,
      [LINK]: '',
      [VISIBLE]: true,
      [TRANSLATE]: true,
    },
    {
      [PATH]: CRUD_PATH.UPLOADING,
      [NAME]: 'Обработка видео',
      [ACTIVE]: false,
      [LINK]: '',
      [VISIBLE]: true,
      [TRANSLATE]: true,
    },
    {
      [PATH]: CRUD_PATH.UPLOADING,
      [NAME]: 'Скачивание файла',
      [ACTIVE]: true,
      [LINK]: '',
      [VISIBLE]: false,
      [TRANSLATE]: true,
    },
  ].filter(({ [VISIBLE]: visible }) => visible),
}].filter(({ [BREAD_CRUMBS_ROUTE.VISIBLE]: visible }) => visible)));

export const $allBreadCrumbsCombineData = combine(
  $webDashboardBC,
  (webDashboardBC) => [...webDashboardBC],
);