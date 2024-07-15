import React from 'react';
import { onSubmit } from 'src/lib/form';

export const Form = ({ className, children, submit }) => (
  <form className={className} autoComplete="off" onSubmit={onSubmit(submit)}>
    {children}
  </form>
);

Form.defaultProps = {
  children: null,
  className: '',
  submit: () => {},
};