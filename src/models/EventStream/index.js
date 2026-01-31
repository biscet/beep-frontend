import { createFactory } from '@withease/factories';
import { allDomain } from '../App';

const sseDomain = allDomain.createDomain('SSE');

export const eventDoneDataFn = sseDomain.createEvent();

export const SSEBalanceFb = createFactory(() => null);
