import { axios } from 'src/lib/axios';

export const authLoginSign = (data) => axios.post('/auth/login', data);

export const getUserInfoSign = () => axios.get('/auth/my');