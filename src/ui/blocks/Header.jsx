import React, { useContext, useEffect, useState } from 'react';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { PAGES_PATH } from 'src/dict/path';
import { Button } from 'src/ui/components/Form';
import { I18nContext, LanguagePicker, ThemePicker } from 'src/ui/components/Helpers';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HEADER_ANIMATION } from 'src/dict/animate';
import { $headerAnimationComplete, setHeaderAnimationStateFn } from 'src/models/App';
import { useUnit } from 'effector-react';
import { rootContainer } from 'src/dict/config';
import { cx } from 'src/lib/lodash';

const onAnimationComplete = () => {
  setHeaderAnimationStateFn(true);
};

export const Header = () => {
  const t = useContext(I18nContext);
  const headerAnimationComplete = useUnit($headerAnimationComplete);
  const [scrolledRoot, setScrolledRoot] = useState(false);

  useEffect(() => {
    rootContainer.addEventListener('scroll', () => {
      console.log(rootContainer.scrollTop);

      if (rootContainer.scrollTop > 0) {
        setScrolledRoot(true);
      }

      if (rootContainer.scrollTop === 0) {
        setScrolledRoot(false);
      }
    });
  }, []);

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
          <ThemePicker />
          <LanguagePicker />

          <Button
            type={BUTTON_TYPES.LINK}
            variant={BUTTON_VARIATION.TEXT}
            path={`/${PAGES_PATH.LOGIN}`}
          >
            {t('Вход')}
          </Button>

          <Button type={BUTTON_TYPES.LINK} path={`/${PAGES_PATH.REGISTRATION}`}>
            {t('Регистрация')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};