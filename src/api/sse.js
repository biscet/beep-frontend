import { storage } from 'src/lib/storage';
import { TOKENS } from 'src/dict/config';

export const getNewTokenForSSESign = () => Promise.resolve({
  access_token: storage.get(TOKENS.ACCESS),
});

export const userDataStreamSign = '';
