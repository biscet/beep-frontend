import React, { useContext } from 'react';
import { useUnit, createComponent } from 'effector-react';
import { NavLink } from 'react-router-dom';
import { $userCombineData } from 'src/models/User';
import { USER_FIELDS } from 'src/dict/fields/models/user';
import { Button } from 'src/ui/components/Form';
import {
  I18nContext, ShimmerSideBarCreateBtn, ShimmerSideBarLink, ShimmerUserInfo,
} from 'src/ui/components/Helpers';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { LogoutSVG, AddSVG, SupportSVG } from 'src/ui/media/images';
import { getUserInfoFx } from 'src/models/Login';
import {
  CRUD_PATH, PAGES_PATH, SIDEBAR_ROUTES_FIELDS, WEB_PATH,
} from 'src/dict/path';
import { $modalIsOpen, closeModalFn, openModalFn } from 'src/models/Helpers/Modal';
import { MODAL_FIELDS } from 'src/dict/modal';
import { CreateProject } from 'src/ui/components/modals';
import {
  $isHoveredLogout, $sidebarRoutes, setIsHoveredLogoutFn, triggerLogoutFn,
} from 'src/models/Blocks';
import {
  $initApp, $openMobileSidebar, $pathnameUrl, openMobileSidebarFn,
} from 'src/models/App';
import { cx, isEmpty } from 'src/lib/lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { USER_INFO_LOGOUT_ANIMATE, USER_INFO_SPAN_ANIMATE, USER_INFO_WRAPPER_ANIMATE } from 'src/dict/animate';
import { prependFn, prependObstacleFn } from 'src/lib/helpers';
import { $innerSizes } from 'src/models/Helpers/Resize';

const { EMAIL, USERNAME, AVATAR } = USER_FIELDS;
const {
  NAME, PATH, ICON, VALIDATE, GENERAL_PAGE,
} = SIDEBAR_ROUTES_FIELDS;

const isModal = (modalIsOpen) => () => {
  if (modalIsOpen) {
    closeModalFn();
  } else {
    openModalFn({ [MODAL_FIELDS.CHILDREN]: CreateProject });
  }
};

const UserUnfo = createComponent(
  [$userCombineData, $isHoveredLogout], ({ loading }, units) => {
    const t = useContext(I18nContext);
    const [{ [EMAIL]: email, [USERNAME]: username, [AVATAR]: avatarChar }, isHovered] = units;

    return loading ? <ShimmerUserInfo /> : (
      <div className="sidebar__user-info user-info">
        <div className="user-info__box">
          <div className="user-info__avatar">
            {avatarChar}
          </div>

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
          onHoverStart={prependObstacleFn(setIsHoveredLogoutFn, true)}
          onHoverEnd={prependObstacleFn(setIsHoveredLogoutFn, false)}
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
    );
  },
);

const SidebarRoutes = createComponent(
  [$sidebarRoutes, $pathnameUrl], ({ loading }, units) => {
    const t = useContext(I18nContext);
    const [sidebarRoutes, pathnameUrl] = units;

    return (
      <div className="sidebar__routes">
        {loading
          ? <ShimmerSideBarLink length={sidebarRoutes.length} />
          : sidebarRoutes.map(({
            [NAME]: name,
            [PATH]: path,
            [ICON]: Icon,
            [VALIDATE]: validate,
            [GENERAL_PAGE]: page,
          }) => {
            const urls = pathnameUrl.split('/');
            const conditionClass = urls.filter(
              (url) => (url === page) || (validate.includes(url)),
            ).length > 1;

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
    );
  },
);

const CreateProjectComponent = createComponent(
  $modalIsOpen,
  ({ loading }, modalIsOpen) => {
    const t = useContext(I18nContext);

    return loading
      ? <ShimmerSideBarCreateBtn />
      : (
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON_VARIATION.TEXT}
          activeClass="bottom-side__link link link_active-create-project"
          nonActiveClass="bottom-side__link link link_create-project"
          onClick={isModal(modalIsOpen)}
          conditionClass={modalIsOpen}
          data-disabled={modalIsOpen}
        >
          <AddSVG />
          {t('Создать проект')}
        </Button>
      );
  },
);

const PolicyLink = React.memo(() => {
  const t = useContext(I18nContext);

  return (
    <a
      className="bottom-side__policy"
      href="/privacy"
      target="__blank"
      rel="noopener noreferrer"
    >
      {t('Политика конфиденциальности')}
    </a>
  );
});

const SupportLink = React.memo(() => {
  const t = useContext(I18nContext);

  return (
    <a
      href="https://t.me/beep_support_bot"
      target="__blank"
      rel="noopener noreferrer"
      className="bottom-side__link link link_support"
    >
      <SupportSVG />
      {t('Чат с поддержкой')}
    </a>
  );
});

export const Sidebar = () => {
  const [
    userInfoPending, initApp, openMobileSidebar, { width },

  ] = useUnit([getUserInfoFx.pending, $initApp, $openMobileSidebar, $innerSizes]);

  return (
    <div className={
      cx({
        defaultClass: ['sidebar'],
        activeClass: 'sidebar_close',
        condition: (openMobileSidebar === false) && (width < 1281),
      })
    }
    >
      {(width < 1281) ? (
        <div
          className="sidebar__burger"
          onClick={prependFn(openMobileSidebarFn, !openMobileSidebar)}
        >
          <span />
          <span />
          <span />
        </div>
      ) : null}

      <NavLink
        to={`/${PAGES_PATH.WEB}/${WEB_PATH.PROJECTS}/${CRUD_PATH.CATALOG}?page=1`}
        className="sidebar__logo"
        activeClassName=""
      >
        get-beeped
      </NavLink>

      <CreateProjectComponent loading={userInfoPending || !initApp} />

      <div className="sidebar__divider" />

      <SidebarRoutes loading={userInfoPending || !initApp} />

      <div className="sidebar__bottom-side bottom-side">
        <SupportLink />
        <UserUnfo loading={userInfoPending || !initApp} />
        <PolicyLink />
      </div>
    </div>
  );
};