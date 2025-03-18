import { CONFIG } from 'src/dict/config';
import { userInstance } from 'src/lib/axios';

export const getNewTokenForSSESign = (data) => userInstance.post('/auth/refresh', data);

export const userDataStreamSign = `${CONFIG.STREAMS_API_URL}/user-data`;