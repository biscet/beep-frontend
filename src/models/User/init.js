import { sample, split } from 'effector';
import { get, isEmpty } from 'src/lib/lodash';
import { USER_BACKEND_FIELDS, USER_FIELDS } from 'src/dict/fields/models/user';
import { debounce, spread } from 'patronum';
import { yandexContainerErrorContract } from 'src/lib/contracts';
import { $isWebPage } from '../Web';
import { getUserInfoFx } from '../Login';
import {
  $userAvatar, $userEmail, $userName, logoutFn, refreshUserDataFn,
} from '.';
import { $initApp } from '../App';

const {
  EMAIL, USERNAME, AVATAR, LOADED,
} = USER_FIELDS;

sample({
  clock: $isWebPage,
  filter: $isWebPage,
  target: getUserInfoFx,
});

sample({
  clock: getUserInfoFx.doneData,
  fn: (data) => {
    const userEmail = get(data, USER_BACKEND_FIELDS.EMAIL, '-');
    const userName = get(data, USER_BACKEND_FIELDS.USERNAME, '-');

    return ({
      [EMAIL]: userEmail,
      [USERNAME]: userName,
      [AVATAR]: !isEmpty(userName) ? userName[0].toUpperCase() : '-',
      [LOADED]: true,
    });
  },
  target: spread({
    targets: {
      [EMAIL]: $userEmail,
      [USERNAME]: $userName,
      [AVATAR]: $userAvatar,
      [LOADED]: $initApp,
    },
  }),
});

split({
  source: getUserInfoFx.fail,
  match: {
    retry: (data) => yandexContainerErrorContract(data),
  },
  cases: {
    retry: refreshUserDataFn,
    __: logoutFn,
  },
});

sample({
  clock: debounce({ source: refreshUserDataFn, timeout: 500 }),
  target: getUserInfoFx,
});