import { combine } from 'effector';
import { USER_FIELDS } from 'src/dict/fields/models/user';
import { allDomain } from '../App';

const { EMAIL, USERNAME, AVATAR } = USER_FIELDS;

const userDomain = allDomain.createDomain('User');

export const logoutFn = userDomain.createEvent();

export const $userName = userDomain.createStore('-');
export const $userEmail = userDomain.createStore('-');
export const $userAvatar = userDomain.createStore('-');

export const $userCombineData = combine(
  $userName, $userEmail, $userAvatar,
  (userName, userEmail, userAvatar) => ({
    [EMAIL]: userEmail,
    [AVATAR]: userAvatar,
    [USERNAME]: userName,
  }),
);