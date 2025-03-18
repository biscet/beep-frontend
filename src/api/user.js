import { userInstance } from 'src/lib/axios';

export const userConfirmSign = (data) => userInstance.post('/auth/confirm', data);

export const userResendEmailSign = (data) => userInstance.post('/auth/resend-email', data);
