import React from 'react';
import { useGate, useUnit } from 'effector-react';
import { get } from 'src/lib/lodash';
import { $fullyLoadApplication, RouteGate } from 'src/models/App';
import { motion } from 'framer-motion';
import { DEFAULT_LAYOUT_ANIMATION } from 'src/dict/animate';
import { MouseParallaxContainer } from 'react-parallax-mouse';
import { MOUSE_PARALLAX_CONTAINER_STYLE } from 'src/dict/config';

const DefaultLayout = ({ children }) => {
  const fullyLoadApplication = useUnit($fullyLoadApplication);

  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
  });

  return fullyLoadApplication ? (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        className="default-content"
        exit="exit"
        variants={DEFAULT_LAYOUT_ANIMATION}
      >
        <MouseParallaxContainer
          globalFactorX={0.05}
          globalFactorY={0.05}
          containerStyle={MOUSE_PARALLAX_CONTAINER_STYLE}
        >

          <div className="default-content__wrapper">
            {children}
          </div>
        </MouseParallaxContainer>
      </motion.div>
    </>
  ) : null;
};

export { DefaultLayout };
