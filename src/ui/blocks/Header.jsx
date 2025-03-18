import React, { useContext, useEffect } from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { PAGES_PATH } from 'src/dict/path';
import { Button } from 'src/ui/components/Form';
import {
  I18nContext,
  LanguagePicker,
  ThemePicker,
} from 'src/ui/components/Helpers';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HEADER_ANIMATION, HEADER_TEXT_BUTTON_ANIMATION } from 'src/dict/animate';
import { $headerAnimationComplete, $scrolledRoot, setHeaderAnimationStateFn } from 'src/models/Blocks';
import { createComponent } from 'effector-react';
import { cx } from 'src/lib/lodash';
import { $isLoginPage } from 'src/models/Login';
import { $isRegistrationPage } from 'src/models/Registration';
import { $isPricePage } from 'src/models/Payment';
import { $innerSizes } from 'src/models/Helpers/Resize';
import { $openMobileSidebar, openMobileSidebarFn } from 'src/models/App';
import { prependFn } from 'src/lib/helpers';
import { rootContainer } from 'src/dict/config';

const onAnimationComplete = () => {
  setHeaderAnimationStateFn(true);
};

export const Header = createComponent(
  [$headerAnimationComplete, $isLoginPage,
    $isRegistrationPage, $scrolledRoot, $isPricePage,
    $innerSizes, $openMobileSidebar],
  (_, units) => {
    const t = useContext(I18nContext);

    const [headerAnimationComplete, isLoginPage,
      isRegistrationPage, scrolledRoot, isPricePage,
      { width }, openMobileSidebar] = units;

    const authPage = isLoginPage || isRegistrationPage;

    useEffect(() => {
      rootContainer.style.overflowY = openMobileSidebar ? 'hidden' : 'auto';
    }, [openMobileSidebar]);

    return (
      <motion.div
        className={cx({
          defaultClass: ['header'],
          activeClass: 'header_scrolled',
          condition: scrolledRoot,
        })}
        animate={HEADER_ANIMATION.animate(headerAnimationComplete)}
        transition={HEADER_ANIMATION.transition(headerAnimationComplete)}
        onAnimationComplete={onAnimationComplete}
      >
        <div className="header__box">
          <NavLink
            to="/"
            className="header__logo"
            activeClassName=""
          >
            get-beeped
          </NavLink>

          <div
            className="header__nav nav nav_mobile"
            onClick={prependFn(openMobileSidebarFn, !openMobileSidebar)}
          >
            <span />
            <span />
            <span />
          </div>

          <div className={
            cx({
              defaultClass: ['header__nav', 'nav', 'nav_desktop'],
              activeClass: 'nav_open',
              condition: openMobileSidebar && (width < 1281),
            })
          }
          >
            <motion.div layout className="header-grid-1">
              <ThemePicker />
            </motion.div>
            <motion.div layout className="header-grid-2">
              <LanguagePicker />
            </motion.div>

            {(isPricePage === false) || (width < 1281) ? (
              <motion.div
                layout
                initial={HEADER_TEXT_BUTTON_ANIMATION.initial(headerAnimationComplete)}
                animate={HEADER_TEXT_BUTTON_ANIMATION.animate}
                exit={HEADER_TEXT_BUTTON_ANIMATION.exit}
                transition={HEADER_TEXT_BUTTON_ANIMATION.transition}
                className="header-grid-3"
              >
                <Button
                  type={BUTTON_TYPES.LINK}
                  variant={width < 1281 ? BUTTON_VARIATION.SECONDARY : BUTTON_VARIATION.TEXT}
                  path={`/${PAGES_PATH.PRICES}`}
                >
                  {t('Цены')}
                </Button>
              </motion.div>
            ) : null}

            {(authPage === false) || (width < 1281) ? (
              <motion.div
                initial={HEADER_TEXT_BUTTON_ANIMATION.initial(headerAnimationComplete)}
                animate={HEADER_TEXT_BUTTON_ANIMATION.animate}
                exit={HEADER_TEXT_BUTTON_ANIMATION.exit}
                transition={HEADER_TEXT_BUTTON_ANIMATION.transition}
                className="header-grid-4"
              >
                <Button
                  type={BUTTON_TYPES.LINK}
                  variant={width < 1281 ? BUTTON_VARIATION.SECONDARY : BUTTON_VARIATION.TEXT}
                  path={`/${PAGES_PATH.LOGIN}`}
                >
                  {t('Вход')}
                </Button>
              </motion.div>
            ) : null}

            <motion.div layout className="header-grid-5">
              <Button
                type={BUTTON_TYPES.LINK}
                nonActiveClass="button_large"
                path={isRegistrationPage ? `/${PAGES_PATH.LOGIN}` : `/${PAGES_PATH.REGISTRATION}`}
                variant={authPage && (width > 1280) ? BUTTON_VARIATION.SECONDARY : BUTTON_VARIATION.PRIMARY}
              >
                {t(isRegistrationPage && (width > 1280) ? 'Вход' : 'Регистрация')}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  },
);