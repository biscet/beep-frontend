import { allDomain } from 'src/models/App';

const historyDomain = allDomain.createDomain('History');

export const pushHistoryFn = historyDomain.createEvent();

export const $history = historyDomain.createStore({});

export const pushHistoryFx = historyDomain.createEffect(({ history, path }) => history.push(path));