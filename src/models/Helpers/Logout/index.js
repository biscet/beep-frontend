import { allDomain } from 'src/models/App';

const logoutDomain = allDomain.createDomain('Logout');

export const logoutFn = logoutDomain.createEvent();