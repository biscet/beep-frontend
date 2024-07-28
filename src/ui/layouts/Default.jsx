import React from 'react';
import { useGate, useUnit } from 'effector-react';
import { get } from 'src/lib/lodash';
import { $fullyLoadApplication, RouteGate } from 'src/models/App';
import { motion, LayoutGroup } from 'framer-motion';
import { DEFAULT_LAYOUT_ANIMATION } from 'src/dict/animate';
import { MouseParallaxContainer } from 'react-parallax-mouse';
import { MOUSE_PARALLAX_CONTAINER_STYLE } from 'src/dict/config';
import { $isLoginPage } from 'src/models/Login';
import { $isRegistrationPage } from 'src/models/Registration';
import { useHistory } from 'react-router-dom';
import { ScrollToTop } from '../components/ScrollToTop';

const DefaultLayout = ({ children }) => {
  const [fullyLoadApplication, isLoginPage, isRegistrationPage] = useUnit(
    [$fullyLoadApplication, $isLoginPage, $isRegistrationPage],
  );

  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    history: useHistory(),
  });

  const authPage = isLoginPage || isRegistrationPage;

  return fullyLoadApplication ? (
    <LayoutGroup id="default">
      <motion.div
        initial="initial"
        animate="animate"
        className="default-content"
        exit="exit"
        variants={DEFAULT_LAYOUT_ANIMATION}
      >
        {authPage ? (
          <div className="default-content__wrapper">
            {children}
          </div>
        ) : (
          <MouseParallaxContainer
            globalFactorX={0.05}
            globalFactorY={0.05}
            containerStyle={MOUSE_PARALLAX_CONTAINER_STYLE}
          >
            <div className="default-content__wrapper">
              {children}
            </div>
          </MouseParallaxContainer>
        )}
      </motion.div>

      <ScrollToTop />
    </LayoutGroup>
  ) : null;
};

export { DefaultLayout };
