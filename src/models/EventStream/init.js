import { invoke } from '@withease/factories';
import { sample } from 'effector';
import { get, saltString } from 'src/lib/lodash';
import { TOKENS } from 'src/dict/config';
import { storage } from 'src/lib/storage';
import { EVENT_STREAM_FIELDS } from 'src/dict/fields/models/sse';
import {
  eventDoneDataFn, getNewTokenForSSEFx,
  refreshSEEConnectionFn, SSEBalanceFb,
} from '.';
import { changeBalancesFn } from '../User';
import { setProjectsBackgroundFn, setProjectsStatusesFn } from '../Web/Projects';

invoke(SSEBalanceFb);

sample({
  clock: getNewTokenForSSEFx.doneData,
  fn: (data) => {
    storage.set(TOKENS.ACCESS, saltString(data?.access_token, true));

    return null;
  },
  target: refreshSEEConnectionFn,
});

sample({
  clock: eventDoneDataFn,
  target: [
    changeBalancesFn.prepend((data) => get(data, EVENT_STREAM_FIELDS.BALANCE, {})),
    setProjectsStatusesFn.prepend((data) => get(data, EVENT_STREAM_FIELDS.PROJECTS, {})),
    setProjectsBackgroundFn.prepend((data) => get(data, EVENT_STREAM_FIELDS.BACKGROUND, {})),
  ],
});