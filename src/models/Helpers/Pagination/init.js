import { sample, split } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { storage } from 'src/lib/storage';
import { $pathnameUrl, $pathParams, AppGate } from 'src/models/App';
import {
  crossPagination, PAGINATION_ACTIONS, PAGINATION_FIELD, PAGINATION_QUERY_FIELDS,
} from 'src/dict/pagination';
import { getPagination } from 'src/lib/helpers';
import { getAllQueryParamsFromUrl, getQueryParamFromUrl } from 'src/lib/url';
import {
  $pagination, resetPaginationQueryFn,
  getPaginationFx, changePaginationQueryFn,
  changePaginationFn, goToPageByPaginationFn,
  changePaginationFx,
  getPaginationFn,
  $paginationQuery,
} from './index';
import { pushHistoryFn } from '../History';

$pagination
  .on(changePaginationFn, (_, val) => val)
  .on(getPaginationFx.doneData, (_, val) => val);

$paginationQuery
  .on(changePaginationQueryFn, (_, query) => query)
  .on(resetPaginationQueryFn, () => ({
    [PAGINATION_QUERY_FIELDS.OFFSET]: 0,
    [PAGINATION_QUERY_FIELDS.LIMIT]: getPagination(),
  }));

sample({
  clock: AppGate.state,
  filter: () => isEmpty(storage.get(PAGINATION_FIELD.STORAGE)),
  fn: () => crossPagination,
  target: changePaginationFn,
});

sample({
  clock: goToPageByPaginationFn,
  source: $pathnameUrl,
  fn: (pathnameUrl, event) => {
    const params = getAllQueryParamsFromUrl();
    const {
      [PAGINATION_FIELD.DATA_NUMBER]: dataNumber,
      [PAGINATION_FIELD.ACTION]: action,
      [PAGINATION_FIELD.DATA_LAST]: dataLastPage,
    } = event;

    switch (action) {
      case PAGINATION_ACTIONS.NEXT: {
        params.page = Number(params.page) + 1;
        break;
      }
      case PAGINATION_ACTIONS.PREV: {
        params.page = Number(params.page) - 1;
        break;
      }
      case PAGINATION_ACTIONS.FROM: {
        params.page = dataNumber;
        break;
      }
      case PAGINATION_ACTIONS.FIRST: {
        params.page = 1;
        break;
      }
      case PAGINATION_ACTIONS.LAST: {
        params.page = dataLastPage;
        break;
      }
      default: {
        break;
      }
    }

    return `${pathnameUrl}?${new URLSearchParams(params).toString()}`;
  },
  target: pushHistoryFn,
});

split({
  source: $pathParams,
  match: {
    isPageQuery: (pathParams) => {
      const pageParam = getQueryParamFromUrl(pathParams, 'page');
      return !isEmpty(pageParam);
    },
    isNotPageQuery: (pathParams) => {
      const pageParam = getQueryParamFromUrl(pathParams, 'page');
      return isEmpty(pageParam);
    },
  },
  cases: {
    isPageQuery: changePaginationQueryFn.prepend((pathParams) => {
      const pageParam = getQueryParamFromUrl(pathParams, 'page');

      return ({
        [PAGINATION_QUERY_FIELDS.OFFSET]: Number(getPagination()) * (Number(pageParam) - 1),
        [PAGINATION_QUERY_FIELDS.LIMIT]: getPagination(),
      });
    }),
    isNotPageQuery: resetPaginationQueryFn,
  },
});

sample({
  clock: changePaginationFn,
  target: changePaginationFx,
});

sample({
  clock: getPaginationFn,
  target: getPaginationFx,
});