import React from 'react';
import ReactDOM from 'react-dom';
import { createComponent } from 'effector-react';
import { cx, isEmpty } from 'src/lib/lodash';
import { $modal } from 'src/models/Helpers/Modal';
import { MODAL_FIELDS } from 'src/dict/modal';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_MODAL_ANIMATION } from 'src/dict/animate';
import { $isWebPage } from 'src/models/Web';

const { PROPS, CHILDREN } = MODAL_FIELDS;

export const Modal = createComponent([$modal, $isWebPage], (_, units) => {
  const [{ [CHILDREN]: children, [PROPS]: props }, isWebPage] = units;

  return ReactDOM.createPortal(
    <AnimatePresence exitBeforeEnter>
      {!isEmpty(children) && (
        <motion.div
          key="modal"
          className={cx({
            defaultClass: ['modal'],
            activeClass: 'modal_web',
            condition: isWebPage,
          })}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={DEFAULT_MODAL_ANIMATION}
        >
          <div className="modal__wrapper">
            {React.createElement(children, { ...props })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});