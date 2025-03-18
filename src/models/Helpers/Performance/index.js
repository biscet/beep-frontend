import { VARIATION_PERFORMANCE_TYPES } from 'src/dict/performance';
import { allDomain } from 'src/models/App';

const performanceDomain = allDomain.createDomain('Performance');

export const changePerfomanceInfoFn = performanceDomain.createEvent();

export const $performanceInfo = performanceDomain.createStore({});

export const $performanceSettings = performanceDomain.createStore(VARIATION_PERFORMANCE_TYPES.HIGH);