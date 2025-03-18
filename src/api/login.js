import { userInstance } from 'src/lib/axios';

export const authLoginSign = (data) => userInstance.post('/auth/login', data);

export const getUserInfoSign = () => userInstance.get('/auth/my');