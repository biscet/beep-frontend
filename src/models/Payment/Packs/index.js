import { getPaymentAcquireSign } from 'src/api/payment';
import { isCurrentPath } from 'src/lib/url';
import { CRUD_PATH, PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { $pathnameUrl } from 'src/models/App';
import { paymentDomain } from '..';

export const goToBuyPackPageFn = paymentDomain.createEvent();
export const goToPacksPageFn = paymentDomain.createEvent();

export const paymentLogicTriggerFn = paymentDomain.createEvent();

export const checkEcquireContentFn = paymentDomain.createEvent();

export const changeHtmlEcqireContentFn = paymentDomain.createEvent();
export const resetEcquireDataFn = paymentDomain.createEvent();

export const changeLoadingEcqireIdFn = paymentDomain.createEvent();

export const $htmlEcquireContent = paymentDomain.createStore(null);

export const $loadingEcqireId = paymentDomain.createStore('');

export const getPaymentAcquireFx = paymentDomain.createEffect(getPaymentAcquireSign);

export const $isWebPaymentPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PAYMENT]),
);

export const $isWebBuyPacksPage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.WEB, WEB_PATH.PAYMENT, CRUD_PATH.BUY_PACKS]),
);
