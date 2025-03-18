import React from 'react';
import { useGate, useUnit } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { cx, get } from 'src/lib/lodash';
import { WebGate } from 'src/models/App';
import { SidebarHeader } from 'src/ui/blocks/SidebarHeader';
import { WEB_LAYOUT_ANIMATION } from 'src/dict/animate';
import { $webLayoutPaddingCondition } from 'src/models/Blocks';
import { LoaderLayout } from '../components/Helpers/Loaders';
import { performanceMotionLayoutHook } from '../hooks';

const WebLayout = ({ children }) => {
  const webLayoutPaddingCondition = useUnit($webLayoutPaddingCondition);
  const { LayoutGroup, motion } = performanceMotionLayoutHook();

  useGate(WebGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    history: useHistory(),
  });

  return (
    <LayoutGroup id="web">
      <div className="web-content">
        <SidebarHeader />

        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          className={cx({
            defaultClass: ['web-content__wrapper', 'wrapper'],
            activeClass: 'wrapper_catalog',
            condition: webLayoutPaddingCondition,
          })}
          variants={WEB_LAYOUT_ANIMATION}
        >
          {children}
        </motion.div>
      </div>

      <LoaderLayout />
    </LayoutGroup>
  );
};

export { WebLayout };
