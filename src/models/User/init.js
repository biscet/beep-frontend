import { sample } from 'effector';
import { get, isEmpty } from 'src/lib/lodash';
import { USER_BACKEND_FIELDS, USER_FIELDS } from 'src/dict/fields/models/user';
import { spread } from 'patronum';
import { $isWebPage } from '../Web';
import { getUserInfoFx } from '../Login';
import { $userAvatar, $userEmail, $userName } from '.';
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
    let userAvatar = '-';

    if (!isEmpty(get(data, USER_BACKEND_FIELDS.USERNAME, ''))) {
      userAvatar = userName[0].toUpperCase();
    }

    return ({
      [EMAIL]: userEmail,
      [USERNAME]: userName,
      [AVATAR]: userAvatar,
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