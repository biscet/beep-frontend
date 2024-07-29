import React, { useContext, useEffect, useState } from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { PAGES_PATH } from 'src/dict/path';
import { Button } from 'src/ui/components/Form';
import { I18nContext, LanguagePicker, ThemePicker } from 'src/ui/components/Helpers';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HEADER_ANIMATION, HEADER_TEXT_BUTTON_ANIMATION } from 'src/dict/animate';
import { $headerAnimationComplete, setHeaderAnimationStateFn } from 'src/models/Blocks';
import { useUnit } from 'effector-react';
import { rootContainer } from 'src/dict/config';
import { cx } from 'src/lib/lodash';
import { $isLoginPage } from 'src/models/Login';
import { $isRegistrationPage } from 'src/models/Registration';

const onAnimationComplete = () => {
  setHeaderAnimationStateFn(true);
};

export const Header = () => {
  const t = useContext(I18nContext);
  const [headerAnimationComplete, isLoginPage, isRegistrationPage] = useUnit(
    [$headerAnimationComplete, $isLoginPage, $isRegistrationPage],
  );
  const [scrolledRoot, setScrolledRoot] = useState(false);

  useEffect(() => {
    rootContainer.addEventListener('scroll', () => {
      if (rootContainer.scrollTop > 0) {
        setScrolledRoot(true);
      }

      if (rootContainer.scrollTop === 0) {
        setScrolledRoot(false);
      }
    });
  }, []);

  const authPage = isLoginPage || isRegistrationPage;

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
          beep
        </NavLink>

        <div className="header__nav nav">
          <motion.div layout>
            <ThemePicker />
          </motion.div>
          <motion.div layout>
            <LanguagePicker />
          </motion.div>

          {authPage === false ? (
            <motion.div
              initial={HEADER_TEXT_BUTTON_ANIMATION.initial(headerAnimationComplete)}
              animate={HEADER_TEXT_BUTTON_ANIMATION.animate}
              exit={HEADER_TEXT_BUTTON_ANIMATION.exit}
              transition={HEADER_TEXT_BUTTON_ANIMATION.transition}
            >
              <Button
                type={BUTTON_TYPES.LINK}
                variant={BUTTON_VARIATION.TEXT}
                path={`/${PAGES_PATH.LOGIN}`}
              >
                {t('Вход')}
              </Button>
            </motion.div>
          ) : null}

          <motion.div layout>
            <Button
              type={BUTTON_TYPES.LINK}
              nonActiveClass="button_large"
              path={isRegistrationPage ? `/${PAGES_PATH.LOGIN}` : `/${PAGES_PATH.REGISTRATION}`}
              variant={authPage ? BUTTON_VARIATION.SECONDARY : BUTTON_VARIATION.PRIMARY}
            >
              {t(isRegistrationPage ? 'Вход' : 'Регистрация')}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};