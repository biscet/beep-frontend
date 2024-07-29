import { combine } from 'effector';
import { BREAD_CRUMBS_FIELD, BREAD_CRUMBS_ROUTE } from 'src/dict/breadcrumbs';
import { PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { allDomain } from 'src/models/App';

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

export const $webDashboardBC = combine(() => ([{
  [BREAD_CRUMBS_ROUTE.PATH]: `${PAGES_PATH.WEB}/${WEB_PATH.DASHBOARD}`,
  [BREAD_CRUMBS_ROUTE.VISIBLE]: false,
  [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: [
    {
      [PATH]: WEB_PATH.DASHBOARD,
      [NAME]: 'Дашборд',
      [ACTIVE]: true,
      [LINK]: '',
      [VISIBLE]: true,
      [TRANSLATE]: true,
    },
  ].filter(({ [VISIBLE]: visible }) => visible),
},
{
  [BREAD_CRUMBS_ROUTE.PATH]: `${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}`,
  [BREAD_CRUMBS_ROUTE.VISIBLE]: true,
  [BREAD_CRUMBS_ROUTE.BREADCRUMBS]: [
    {
      [PATH]: WEB_PATH.PROJECTS,
      [NAME]: 'Проекты',
      [ACTIVE]: true,
      [LINK]: '',
      [VISIBLE]: true,
      [TRANSLATE]: true,
    },
  ].filter(({ [VISIBLE]: visible }) => visible),
}].filter(({ [BREAD_CRUMBS_ROUTE.VISIBLE]: visible }) => visible)));

export const $allBreadCrumbsCombineData = combine(
  $webDashboardBC,
  (webDashboardBC) => [...webDashboardBC],
);