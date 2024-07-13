import React from 'react';
import { useGate, useUnit } from 'effector-react';
import { get } from 'src/lib/lodash';
import { $fullyLoadApplication, RouteGate } from 'src/models/App';
import { Header } from 'src/ui/blocks/Header';
import { motion } from 'framer-motion';
import { DEFAULT_LAYOUT_ANIMATION } from 'src/dict/animate';
import { MouseParallaxContainer } from 'react-parallax-mouse';

const DefaultLayout = ({ children }) => {
  const fullyLoadApplication = useUnit($fullyLoadApplication);

  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
  });

  return fullyLoadApplication ? (
    <>
      <Header />
      <motion.div
        initial="initial"
        animate="animate"
        className="default-content"
        exit="exit"
        variants={DEFAULT_LAYOUT_ANIMATION}
      >
        <MouseParallaxContainer globalFactorX={0.05} globalFactorY={0.05}>
          <div className="default-content__wrapper">
            {children}
          </div>
        </MouseParallaxContainer>
      </motion.div>
    </>
  ) : null;
};

export { DefaultLayout };
