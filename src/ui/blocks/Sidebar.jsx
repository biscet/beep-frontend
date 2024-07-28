import React, { useContext } from 'react';
import { useUnit } from 'effector-react';
import { NavLink } from 'react-router-dom';
import { $userCombineData, logoutFn } from 'src/models/User';
import { USER_FIELDS } from 'src/dict/fields/models/user';
import { Button } from 'src/ui/components/Form';
import { I18nContext, ShimmerUserInfo } from 'src/ui/components/Helpers';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { LogoutSVG } from 'src/ui/media/images';
import { getUserInfoFx } from 'src/models/Login';

const { EMAIL, USERNAME, AVATAR } = USER_FIELDS;

export const Sidebar = () => {
  const t = useContext(I18nContext);
  const [{
    [EMAIL]: email,
    [USERNAME]: username,
    [AVATAR]: avatarChar,
  }, userInfoPending] = useUnit([$userCombineData, getUserInfoFx.pending]);

  return (
    <div className="sidebar">
      <NavLink
        to="/web"
        className="sidebar__logo"
        activeClassName=""
      >
        beep
      </NavLink>

      {userInfoPending ? <ShimmerUserInfo /> : (
        <div className="sidebar__user-info user-info">
          <p className="user-info__avatar">{avatarChar}</p>
          <div className="user-info__wrapper">
            <div title={email}>{email}</div>
            <div title={username}>{username}</div>
          </div>
        </div>
      )}

      <div className="sidebar__bottom-side bottom-side">
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON_VARIATION.TEXT}
          onClick={logoutFn}
          nonActiveClass="bottom-side__link link"
        >
          <LogoutSVG />
          {t('Выйти')}
        </Button>

        <a
          className="bottom-side__policy"
          href="#"
          download
        >
          {t('Политика конфиденциальности')}
        </a>
      </div>
    </div>
  );
};