import { attach, sample } from 'effector';
import { $history, pushHistoryFn, pushHistoryFx } from '.';

sample({
  clock: pushHistoryFn,
  fn: (data) => data,
  target: attach({
    effect: pushHistoryFx,
    source: $history,
    mapParams: (path, history) => ({ history, path }),
  }),
});
