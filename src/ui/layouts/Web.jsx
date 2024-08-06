import React from 'react';
import { useGate } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { WebGate } from 'src/models/App';
import { LayoutGroup, motion } from 'framer-motion';
import { SidebarHeader } from 'src/ui/blocks/SidebarHeader';
import { WEB_LAYOUT_ANIMATION } from 'src/dict/animate';

const WebLayout = ({ children }) => {
  useGate(WebGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    history: useHistory(),
  });

  return (
    <LayoutGroup id="web">
      <div
        className="web-content"
      >
        <SidebarHeader />

        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          className="web-content__wrapper"
          variants={WEB_LAYOUT_ANIMATION}
        >
          {children}
        </motion.div>
      </div>
    </LayoutGroup>
  );
};

export { WebLayout };
