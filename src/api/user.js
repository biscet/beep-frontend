import { localBackend } from 'src/services/local-backend';

export const userConfirmSign = (data) => localBackend.confirmUser(data);

export const userResendEmailSign = (data) => localBackend.resendConfirmCode(data);
