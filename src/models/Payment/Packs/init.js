import { sample } from 'effector';
import { ECQUIRE_NAMES_FIELDS, PRICE_INFO_FIELDS } from 'src/dict/fields/models/payment';
import { pushHistoryFn } from 'src/models/Helpers/History';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { debounce } from 'patronum';
import { get, isEmpty } from 'src/lib/lodash';
import { invoke } from '@withease/factories';
import { crudStoreBehaviorPageFb } from 'src/models/Web';
import { notifyErrorFn } from 'src/models/Helpers/Notify';
import { DEFAULT_ERROR_MSG } from 'src/dict/config';
import { $pricesInfoForFrontCombineData } from '..';
import {
  $htmlEcquireContent, $isWebBuyPacksPage,
  $loadingEcqireId,
  changeHtmlEcqireContentFn, changeLoadingEcqireIdFn, checkEcquireContentFn, getPaymentAcquireFx, goToBuyPackPageFn,
  goToPacksPageFn,
  paymentLogicTriggerFn, resetEcquireDataFn,
} from '.';

$htmlEcquireContent
  .reset(resetEcquireDataFn)
  .on(changeHtmlEcqireContentFn, (_, content) => content);

$loadingEcqireId
  .reset(resetEcquireDataFn)
  .on(changeLoadingEcqireIdFn, (_, field) => field);

sample({
  clock: goToBuyPackPageFn,
  target: pushHistoryFn.prepend(() => `/${PAGES_PATH.WEB}/${WEB_PATH.PAYMENT}/${CRUD_PATH.BUY_PACKS}`),
});

sample({
  clock: goToPacksPageFn,
  target: pushHistoryFn.prepend(() => `/${PAGES_PATH.WEB}/${WEB_PATH.PAYMENT}/${CRUD_PATH.PACKS}`),
});

invoke(crudStoreBehaviorPageFb, {
  $page: $isWebBuyPacksPage,
  isPageLogic: checkEcquireContentFn,
  isNotPageLogic: resetEcquireDataFn,
});

sample({
  clock: checkEcquireContentFn,
  source: $htmlEcquireContent,
  filter: (content) => isEmpty(content),
  target: goToPacksPageFn,
});

sample({
  clock: debounce({ source: $isWebBuyPacksPage, timeout: 150 }),
  source: $isWebBuyPacksPage,
  filter: (page) => page === false,
  target: resetEcquireDataFn,
});

sample({
  clock: paymentLogicTriggerFn,
  source: $pricesInfoForFrontCombineData,
  fn: (data, field) => ({
    [ECQUIRE_NAMES_FIELDS.ID]: data[field][PRICE_INFO_FIELDS.ID],
    [PRICE_INFO_FIELDS.SYSTEM_NAME]: field,
  }),
  target: [
    getPaymentAcquireFx,
    changeLoadingEcqireIdFn.prepend((data) => get(data, PRICE_INFO_FIELDS.SYSTEM_NAME, '')),
  ],
});

sample({
  clock: getPaymentAcquireFx.doneData,
  fn: (data) => get(data, ECQUIRE_NAMES_FIELDS.HTML, null),
  target: [changeHtmlEcqireContentFn, goToBuyPackPageFn],
});

sample({
  clock: getPaymentAcquireFx.fail,
  target: [
    resetEcquireDataFn,
    notifyErrorFn.prepend(() => DEFAULT_ERROR_MSG),
  ],
});