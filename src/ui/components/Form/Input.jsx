import React, { useContext, useState } from 'react';
import { INPUT_TYPES, INPUT_VARIATION } from 'src/dict/fields/input';
import { cx, get, isObject } from 'src/lib/lodash';
import { I18nContext } from 'src/ui/components/Helpers';
import { EyeSVG } from 'src/ui/media/images';

const handlerChange = ({ onChange }) => (e) => {
  onChange(isObject(e) ? get(e, 'target.value', '') : e);
};

const handlerClick = ({ onChange, value }) => () => {
  onChange(value);
};

export const Input = ({
  type, placeholder, conditionClass, onChange, errorText,
  activeClass, nonActiveClass, variant, value, hasError,
  onBlur, name, disabled, ...restProps
}) => {
  const t = useContext(I18nContext);
  const [viewPass, setViewPass] = useState(false);

  const className = cx({
    defaultClass: [
      'input',
      `input_${variant}`,
      INPUT_TYPES.PASSWORD === type ? 'input_password' : null,
      hasError ? 'input_error' : null,
    ],
    activeClass,
    nonActiveClass,
    condition: conditionClass,
  });

  const currentValue = isObject(value) ? get(value, 'target.value', '') : value;

  return (
    <div className="input-group">
      <input type={type} name={name} className="autocomplete-input" autoComplete="off" />

      <div className="input-group__box" aria-disabled={disabled} aria-valuetext={type}>
        <input
          {...restProps}
          type={viewPass ? 'text' : type}
          value={currentValue}
          onBlur={onBlur}
          autoComplete="off"
          disabled={disabled}
          name={`effector-${name}`}
          onChange={handlerChange({ onChange })}
          className={className}
          placeholder={t(placeholder)}
        />

        {INPUT_TYPES.PASSWORD === type ? (
          <div
            className={cx({
              defaultClass: ['input-group__icon', 'icon'],
              activeClass: 'icon_show',
              nonActiveClass: 'icon_hide',
              condition: viewPass,
            })}
            onClick={handlerClick({ onChange: setViewPass, value: !viewPass })}
          >
            <EyeSVG />
          </div>
        ) : null}
      </div>

      {hasError ? <p className="input-group__error">{t(errorText)}</p> : null}
    </div>
  );
};

Input.defaultProps = {
  type: INPUT_TYPES.TEXT,
  placeholder: 'Текст',
  activeClass: '',
  nonActiveClass: '',
  conditionClass: false,
  variant: INPUT_VARIATION.PRIMARY,
  onChange: () => {},
  value: '',
  onBlur: () => {},
  errorText: '',
  hasError: false,
  disabled: false,
};