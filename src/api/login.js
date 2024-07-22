import { axios } from 'src/lib/axios';

export const authLoginSign = (data) => axios.post('/auth/login/', data);
