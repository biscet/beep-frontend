import { axios } from 'src/lib/axios';

export const authRegistrationSign = (data) => axios.post('/auth/register/', data);
