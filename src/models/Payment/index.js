import { combine } from 'effector';
import { getPaymentCardsInfoSign } from 'src/api/payment';
import { PRICE_INFO_FIELDS, PRICES_NAMES_FIELDS } from 'src/dict/fields/models/payment';
import {
  CRUD_PATH, PAGES_PATH, ROUTES_FIELDS,
} from 'src/dict/path';
import { get } from 'src/lib/lodash';
import { isCurrentPath } from 'src/lib/url';
import { $pathnameUrl, allDomain } from 'src/models/App';

const {
  SYSTEM_NAME, QUANTITY, PRICE, ID,
} = PRICE_INFO_FIELDS;

const { PATH, ACTIVE } = ROUTES_FIELDS;
const { PACKS, BUY_PACKS } = CRUD_PATH;

export const paymentDomain = allDomain.createDomain('Payment');

export const $pricesInfo = paymentDomain.createStore([]);

export const getPaymentCardsInfoFx = paymentDomain.createEffect(getPaymentCardsInfoSign);

export const $itemsRoutesPayment = combine(() => [
  {
    [PATH]: PACKS,
    [ACTIVE]: true,
  },
  {
    [PATH]: BUY_PACKS,
    [ACTIVE]: true,
  },
].filter(({ [ACTIVE]: active }) => active));

export const $isPricePage = $pathnameUrl.map(
  (path) => isCurrentPath(path, [PAGES_PATH.PRICES]),
);

export const $pricesInfoForFrontCombineData = combine(
  $pricesInfo, (pricesInfo) => {
    const actualPrices = pricesInfo.filter((price) => Object.values(PRICES_NAMES_FIELDS).includes(price[SYSTEM_NAME]));

    const tenMinutes = actualPrices.find((price) => price[SYSTEM_NAME] === PRICES_NAMES_FIELDS.TEN);
    const sixtyMinutes = actualPrices.find((price) => price[SYSTEM_NAME] === PRICES_NAMES_FIELDS.SIXTY);
    const hudredMinutes = actualPrices.find((price) => price[SYSTEM_NAME] === PRICES_NAMES_FIELDS.HUNDRED);

    return {
      [PRICES_NAMES_FIELDS.TEN]: {
        [QUANTITY]: get(tenMinutes, QUANTITY, 0),
        [PRICE]: get(tenMinutes, PRICE, 0),
        [ID]: get(tenMinutes, ID, null),
      },
      [PRICES_NAMES_FIELDS.SIXTY]: {
        [QUANTITY]: get(sixtyMinutes, QUANTITY, 0),
        [PRICE]: get(sixtyMinutes, PRICE, 0),
        [ID]: get(sixtyMinutes, ID, null),
      },
      [PRICES_NAMES_FIELDS.HUNDRED]: {
        [QUANTITY]: get(hudredMinutes, QUANTITY, 0),
        [PRICE]: get(hudredMinutes, PRICE, 0),
        [ID]: get(hudredMinutes, ID, null),
      },
    };
  },
);
