import React from 'react';
import { onSubmit } from 'src/lib/form';
import { motion } from 'framer-motion';
import { DEFAULT_MODAL_FORM_ANIMATION } from 'src/dict/animate';

export const Form = ({ className, children, submit }) => (
  <form className={className} autoComplete="off" onSubmit={onSubmit(submit)}>
    {children}
  </form>
);

export const ModalForm = ({ className, children, submit }) => (
  <motion.form
    initial="initial"
    animate="animate"
    exit="exit"
    variants={DEFAULT_MODAL_FORM_ANIMATION}
    className={className}
    autoComplete="off"
    onSubmit={onSubmit(submit)}
  >
    {children}
  </motion.form>
);

Form.defaultProps = {
  children: null,
  className: '',
  submit: () => {},
};

ModalForm.defaultProps = {
  children: null,
  className: '',
  submit: () => {},
};