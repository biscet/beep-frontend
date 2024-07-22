import { allDomain } from '../App';

const userDomain = allDomain.createDomain('User');

export const logoutFn = userDomain.createEvent();