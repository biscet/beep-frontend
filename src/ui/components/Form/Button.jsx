import React from 'react';
import { NavLink } from 'react-router-dom';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { cx } from 'src/lib/lodash';

export const Button = React.memo(({
  type, children, path, conditionClass, onClick, href,
  activeClass, nonActiveClass, variant, disabled, ...rest
}) => {
  const className = cx({
    defaultClass: ['button', `button_${variant}`],
    activeClass,
    nonActiveClass,
    condition: conditionClass,
  });

  if (type === BUTTON_TYPES.LINK) {
    return (
      <NavLink
        to={path}
        activeClassName=""
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </NavLink>
    );
  }

  if (type === BUTTON_TYPES.DOWNLOAD) {
    return (
      <a
        className={className}
        href={href}
        download
        disabled={disabled}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.defaultProps = {
  type: BUTTON_TYPES.BUTTON,
  children: 'Текст',
  path: '/',
  activeClass: '',
  onClick: () => {},
  nonActiveClass: '',
  conditionClass: false,
  variant: BUTTON_VARIATION.PRIMARY,
};