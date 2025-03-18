import { sample } from 'effector';
import { isEmpty, saltString } from 'src/lib/lodash';
import { TOKENS } from 'src/dict/config';
import { createFactory } from '@withease/factories';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { storage } from 'src/lib/storage';
import { getNewTokenForSSESign, userDataStreamSign } from 'src/api/sse';
import { allDomain } from '../App';
import { logoutFn } from '../Helpers/Logout';
import { getUserInfoFx } from '../Login';

const sseDomain = allDomain.createDomain('SSE');

export const eventDoneDataFn = sseDomain.createEvent();
export const refreshSEEConnectionFn = sseDomain.createEvent();

export const getNewTokenForSSEFx = sseDomain.createEffect(getNewTokenForSSESign);

const messageConnection = ({ data: eventData }) => {
  eventDoneDataFn(JSON.parse(eventData));
};

export const SSEBalanceFb = createFactory(() => {
  let sseConnection = null;

  const closeConnection = (e) => {
    if (!isEmpty(sseConnection) && !isEmpty(e.error)) {
      sseConnection.close();
      sseConnection = null;
    }

    if (e.status === 401) {
      sseConnection = null;
      getNewTokenForSSEFx({ [TOKENS.REFRESH]: saltString(storage.get(TOKENS.REFRESH), false) });
    }
  };

  const createConnection = () => {
    if (isEmpty(sseConnection)) {
      sseConnection = new EventSourcePolyfill(
        userDataStreamSign, {
          headers: {
            Authorization: `Bearer ${saltString(storage.get(TOKENS.ACCESS), false)}`,
          },
          heartbeatTimeout: 1024 * 1024,
        },
      );

      sseConnection.addEventListener('message', messageConnection);
      sseConnection.addEventListener('error', closeConnection);
    }
  };

  sample({
    clock: [getUserInfoFx.doneData, refreshSEEConnectionFn],
    fn: () => {
      createConnection();
      return null;
    },
  });

  sample({
    clock: logoutFn,
    fn: () => {
      closeConnection();
      return null;
    },
  });
});