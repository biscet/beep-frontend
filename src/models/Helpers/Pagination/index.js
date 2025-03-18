import { createFactory } from '@withease/factories';
import { sample } from 'effector';
import {
  crossPagination, PAGINATION_ACTIONS, PAGINATION_FIELDS, PAGINATION_QUERY_FIELDS,
} from 'src/dict/pagination';
import { getPagination } from 'src/lib/helpers';
import { get, isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { getAllQueryParamsFromUrl, getQueryParamFromUrl } from 'src/lib/url';
import { $pathParams, allDomain } from 'src/models/App';
import { persist } from 'effector-storage/local';
import { paginationContract } from 'src/lib/contracts';

const paginationDomain = allDomain.createDomain('Pagination');

export const goToPageByPaginationFn = paginationDomain.createEvent();

export const changePaginationFn = paginationDomain.createEvent();

export const changePaginationQueryFn = paginationDomain.createEvent();
export const resetPaginationQueryFn = paginationDomain.createEvent();

export const $pagination = paginationDomain.createStore(crossPagination, { name: PAGINATION_FIELDS.STORAGE });

export const $paginationQuery = paginationDomain.createStore({
  [PAGINATION_QUERY_FIELDS.OFFSET]: 0,
  [PAGINATION_QUERY_FIELDS.LIMIT]: getPagination(),
});

export const $paginationCurrentPage = $pathParams.map((params) => {
  const urlParams = new URLSearchParams(params);
  const page = urlParams.get('page');
  return isEmpty(page) ? '' : page;
});

persist({ store: $pagination, key: PAGINATION_FIELDS.STORAGE, contract: paginationContract() });

export const catalogPaginationFb = createFactory(
  ({ $page, goToPage, fxByUndefinedPage }) => {
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
        const maxPages = Math.ceil(count / storage.get(PAGINATION_FIELDS.STORAGE));
        return maxPages < page;
      },
      fn: () => ({ [PAGINATION_FIELDS.ACTION]: PAGINATION_ACTIONS.FIRST }),
      target: goToPageByPaginationFn,
    });
  },
);
