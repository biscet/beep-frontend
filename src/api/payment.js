import { userInstance } from 'src/lib/axios';

export const getPaymentCardsInfoSign = () => userInstance.get('/minutes/packs');

export const getPaymentAcquireSign = (data) => userInstance.post('/minutes/buy', data);