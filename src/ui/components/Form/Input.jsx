import React, { useContext } from 'react';
import { INPUT_TYPES, INPUT_VARIATION } from 'src/dict/fields/input';
import { cx } from 'src/lib/lodash';
import { I18nContext } from 'src/ui/components/Helpers';

export const Input = ({
  type, placeholder, conditionClass,
  activeClass, nonActiveClass, variant,
}) => {
  const t = useContext(I18nContext);

  const className = cx({
    defaultClass: ['input', `input_${variant}`],
    activeClass,
    nonActiveClass,
    condition: conditionClass,
  });

  return (
    <input
      type={type}
      className={className}
      placeholder={t(placeholder)}
    />
  );
};

Input.defaultProps = {
  type: INPUT_TYPES.TEXT,
  placeholder: 'Текст',
  activeClass: '',
  nonActiveClass: '',
  conditionClass: false,
  variant: INPUT_VARIATION.PRIMARY,
};