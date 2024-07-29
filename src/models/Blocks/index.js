import { allDomain } from '../App';

const blocksDomain = allDomain.createDomain('Blocks');

export const setHeaderAnimationStateFn = blocksDomain.createEvent();

export const $headerAnimationComplete = blocksDomain.createStore(false);