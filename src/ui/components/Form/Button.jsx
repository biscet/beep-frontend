import React from 'react';
import { NavLink } from 'react-router-dom';
import { BUTTON_TYPES, BUTTON_VARIATION } from 'src/dict/fields/button';
import { cx } from 'src/lib/lodash';

export const Button = React.memo(({
  type, children, path, conditionClass, onClick,
  activeClass, nonActiveClass, variant,
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
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
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