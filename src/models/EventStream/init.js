import { invoke } from '@withease/factories';
import { sample } from 'effector';
import { get } from 'src/lib/lodash';
import { EVENT_STREAM_FIELDS } from 'src/dict/fields/models/sse';
import { eventDoneDataFn, SSEBalanceFb } from '.';
import { changeBalancesFn } from '../User';
import { setProjectsBackgroundFn, setProjectsStatusesFn } from '../Web/Projects';

invoke(SSEBalanceFb);

sample({
  clock: eventDoneDataFn,
  target: [
    changeBalancesFn.prepend((data) => get(data, EVENT_STREAM_FIELDS.BALANCE, {})),
    setProjectsStatusesFn.prepend((data) => get(data, EVENT_STREAM_FIELDS.PROJECTS, {})),
    setProjectsBackgroundFn.prepend((data) => get(data, EVENT_STREAM_FIELDS.BACKGROUND, {})),
  ],
});
