import React, { useContext } from 'react';
import { useUnit } from 'effector-react';
import { NavLink } from 'react-router-dom';
import { $userCombineData } from 'src/models/User';
import { USER_FIELDS } from 'src/dict/fields/models/user';
import { Button } from 'src/ui/components/Form';
import { I18nContext, ShimmerUserInfo } from 'src/ui/components/Helpers';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { LogoutSVG, AddSVG } from 'src/ui/media/images';
import { getUserInfoFx } from 'src/models/Login';
import { PAGES_PATH, SIDEBAR_ROUTES_FIELDS, WEB_PATH } from 'src/dict/path';
import { $modalIsOpen, closeModalFn, openModalFn } from 'src/models/Helpers/Modal';
import { MODAL_FIELDS } from 'src/dict/modal';
import { CreateProject } from 'src/pages/children/Web/children/Projects/children/CreateProject';
import {
  $isHovereLogout, $sidebarRoutes, setIsHovereLogoutFn, triggerLogoutFn,
} from 'src/models/Blocks';
import { $pathnameUrl } from 'src/models/App';
import { isEmpty } from 'src/lib/lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { USER_INFO_LOGOUT_ANIMATE, USER_INFO_SPAN_ANIMATE, USER_INFO_WRAPPER_ANIMATE } from 'src/dict/animate';

const { EMAIL, USERNAME, AVATAR } = USER_FIELDS;
const {
  NAME, PATH, ICON,
} = SIDEBAR_ROUTES_FIELDS;

export const Sidebar = () => {
  const t = useContext(I18nContext);
  const [{
    [EMAIL]: email,
    [USERNAME]: username,
    [AVATAR]: avatarChar,
  }, userInfoPending, modalIsOpen,
  sidebarRoutes, pathnameUrl, isHovered] = useUnit(
    [$userCombineData, getUserInfoFx.pending, $modalIsOpen,
      $sidebarRoutes, $pathnameUrl, $isHovereLogout],
  );

  return (
    <div className="sidebar">
      <NavLink
        to={`/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}`}
        className="sidebar__logo"
        activeClassName=""
      >
        beep
      </NavLink>

      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON_VARIATION.TEXT}
        activeClass="bottom-side__link link link_active-create-project"
        nonActiveClass="bottom-side__link link"
        onClick={
          modalIsOpen ? closeModalFn : openModalFn.prepend(() => ({
            [MODAL_FIELDS.CHILDREN]: CreateProject,
          }))
        }
        conditionClass={modalIsOpen}
        data-disabled={modalIsOpen}
      >
        <AddSVG />
        {t('Создать проект')}
      </Button>

      <div className="sidebar__divider" />

      <div className="sidebar__routes">
        {sidebarRoutes.map(({ [NAME]: name, [PATH]: path, [ICON]: Icon }) => {
          const conditionClass = pathnameUrl.includes(path);

          return (
            <Button
              type={BUTTON_TYPES.LINK}
              variant={BUTTON_VARIATION.TEXT}
              key={path}
              path={path}
              nonActiveClass="bottom-side__link link"
              activeClass="bottom-side__link link link_active"
              conditionClass={conditionClass}
              data-disabled={conditionClass}
            >
              {!isEmpty(Icon) ? <Icon /> : null}
              {t(name)}
            </Button>
          );
        })}
      </div>

      <div className="sidebar__bottom-side bottom-side">
        {userInfoPending ? <ShimmerUserInfo /> : (
          <div className="sidebar__user-info user-info">
            <div className="user-info__box">
              <p className="user-info__avatar">{avatarChar}</p>

              <AnimatePresence>
                {!isHovered && (
                  <motion.div
                    key="user-info__wrapper"
                    className="user-info__wrapper"
                    initial={USER_INFO_WRAPPER_ANIMATE.initial}
                    animate={USER_INFO_WRAPPER_ANIMATE.animate}
                    exit={USER_INFO_WRAPPER_ANIMATE.exit}
                    transition={USER_INFO_WRAPPER_ANIMATE.transition}
                  >
                    <div title={email}>{email}</div>
                    <div title={username}>{username}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              key="user-info__logout"
              className="user-info__logout"
              onHoverStart={setIsHovereLogoutFn.prepend(() => true)}
              onHoverEnd={setIsHovereLogoutFn.prepend(() => false)}
              onClick={triggerLogoutFn}
              initial={USER_INFO_LOGOUT_ANIMATE.initial}
              animate={USER_INFO_LOGOUT_ANIMATE.animate(isHovered)}
              transition={USER_INFO_LOGOUT_ANIMATE.transition}
            >
              <LogoutSVG />

              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={USER_INFO_SPAN_ANIMATE.initial}
                    animate={USER_INFO_SPAN_ANIMATE.animate}
                    exit={USER_INFO_SPAN_ANIMATE.exit}
                    transition={USER_INFO_SPAN_ANIMATE.transition}
                  >
                    {t('Выйти')}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

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