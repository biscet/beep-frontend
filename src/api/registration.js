import { localBackend } from 'src/services/local-backend';

export const authRegistrationSign = (data) => localBackend.registerUser(data);
