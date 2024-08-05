import { sample } from 'effector';
import { PAGINATION_ACTIONS, PAGINATION_FIELD, PAGINATION_QUERY_FIELDS } from 'src/dict/pagination';
import { getPagination } from 'src/lib/helpers';
import { get, isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { getAllQueryParamsFromUrl, getQueryParamFromUrl } from 'src/lib/url';
import { $pathParams, allDomain } from 'src/models/App';

const paginationDomain = allDomain.createDomain('Pagination');

export const goToPageByPaginationFn = paginationDomain.createEvent();

export const getPaginationFn = paginationDomain.createEvent();
export const changePaginationFn = paginationDomain.createEvent();

export const changePaginationQueryFn = paginationDomain.createEvent();
export const resetPaginationQueryFn = paginationDomain.createEvent();

export const $pagination = paginationDomain.createStore(getPagination());

export const $paginationQuery = paginationDomain.createStore({
  [PAGINATION_QUERY_FIELDS.OFFSET]: 0,
  [PAGINATION_QUERY_FIELDS.LIMIT]: getPagination(),
});

export const getPaginationFx = paginationDomain.createEffect(() => getPagination());

export const changePaginationFx = paginationDomain.createEffect((theme) => {
  storage.set(PAGINATION_FIELD.STORAGE, theme);
  return theme;
});

export const $paginationCurrentPage = $pathParams.map((params) => {
  const urlParams = new URLSearchParams(params);
  const page = urlParams.get('page');
  return isEmpty(page) ? '' : page;
});

export const catalogPaginationFb = ({ $page, goToPage, fxByUndefinedPage }) => {
  sample({
    clock: $page,
    source: [$pathParams, $paginationCurrentPage],
    filter: ([pathParams], page) => {
      const pageParam = getQueryParamFromUrl(pathParams, 'page');
      return isEmpty(pageParam) && page;
    },
    fn: () => {
      const params = getAllQueryParamsFromUrl();
      const newParams = new URLSearchParams({ ...params, page: '1' });
      return newParams;
    },
    target: goToPage,
  });

  sample({
    clock: fxByUndefinedPage.doneData,
    source: $paginationCurrentPage,
    filter: (page, data) => {
      const count = get(data, 'count', 0);
      const maxPages = Math.ceil(count / storage.get(PAGINATION_FIELD.STORAGE));
      return maxPages < page;
    },
    fn: () => ({ [PAGINATION_FIELD.ACTION]: PAGINATION_ACTIONS.FIRST }),
    target: goToPageByPaginationFn,
  });
};
