import { localBackend } from 'src/services/local-backend';

export const authLoginSign = (data) => localBackend.loginUser(data);

export const getUserInfoSign = () => localBackend.getUserInfo();
