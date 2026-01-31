import { localBackend } from 'src/services/local-backend';

export const getPaymentCardsInfoSign = () => localBackend.getPaymentCards();

export const getPaymentAcquireSign = (data) => localBackend.buyPack(data);
