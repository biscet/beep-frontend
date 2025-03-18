import { userInstance } from 'src/lib/axios';

export const authRegistrationSign = (data) => userInstance.post('/auth/register', data);