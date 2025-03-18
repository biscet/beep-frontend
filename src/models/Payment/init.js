import { sample } from 'effector';
import { $pricesInfo, getPaymentCardsInfoFx } from '.';
import { AppGate } from '../App';

$pricesInfo.on(getPaymentCardsInfoFx.doneData, (_, result) => result);

sample({
  clock: AppGate.state,
  target: getPaymentCardsInfoFx,
});
