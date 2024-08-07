import React from 'react';
import { onSubmit } from 'src/lib/form';
import { motion } from 'framer-motion';
import { DEFAULT_MODAL_FORM_ANIMATION } from 'src/dict/animate';

export const Form = ({
  className, children, submit, id,
}) => (
  <form className={className} id={id} autoComplete="off" onSubmit={onSubmit(submit)}>
    {children}
  </form>
);

export const ModalForm = ({
  className, children, submit, id,
}) => (
  <motion.form
    initial="initial"
    animate="animate"
    exit="exit"
    variants={DEFAULT_MODAL_FORM_ANIMATION}
    className={className}
    autoComplete="off"
    id={id}
    onSubmit={onSubmit(submit)}
  >
    {children}
  </motion.form>
);

Form.defaultProps = {
  children: null,
  className: '',
  submit: () => {},
  id: '',
};

ModalForm.defaultProps = {
  children: null,
  className: '',
  submit: () => {},
  id: '',
};