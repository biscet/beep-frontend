import React, { useContext, useRef } from 'react';
import { cx, isEmpty } from 'src/lib/lodash';
import { codePattern } from 'src/lib/rules';
import { I18nContext } from 'src/ui/components/Helpers';

const handlePaste = (onChange) => (e) => {
  const pasteData = e.clipboardData.getData('text').slice(0, 6);

  if (pasteData.length === 6 && codePattern.test(pasteData)) {
    const characters = [...pasteData.match(new RegExp('.{1,1}', 'g'))];
    onChange(characters);
  } else {
    e.preventDefault();
  }
};

const handleClick = (index, refs) => {
  const input = refs.current[index];
  if (input) {
    input.setSelectionRange(input.value.length, input.value.length);
  }
};

const handleChange = (value, index, code, onChange, refs, digits) => {
  if (!codePattern.test(value)) {
    return;
  }

  if (code[index] && value.length === 1) {
    const newCode = [...code];
    newCode[index] = value;
    onChange(newCode);

    if (index < digits - 1) {
      refs.current[index + 1].focus();
    }
  } else {
    const newCode = [...code];
    newCode[index] = value;
    onChange(newCode);

    if (value.length === 1 && index < digits - 1) {
      refs.current[index + 1].focus();
    }
  }
};

export const InputChars = ({
  placeholder, conditionClass, onChange, errorText, hasError,
  activeClass, nonActiveClass, value, firstError,
  name, disabled, caption, digits, ...restProps
}) => {
  const t = useContext(I18nContext);
  const inputRefs = useRef([]);
  const code = value;

  const className = cx({
    defaultClass: [
      'input', 'input_primary', 'input_char',
      hasError(firstError) ? 'input_error' : null,
    ],
    activeClass,
    nonActiveClass,
    condition: conditionClass,
  });

  return (
    <div className="input-group">
      <div className="input-group__chars" onPaste={handlePaste(onChange)}>
        {code.map((digit, index) => {
          const onChangeInput = (e) => {
            handleChange(e.target.value, index, code, onChange, inputRefs, digits);
          };

          const onRef = (el) => {
            inputRefs.current[index] = el;
            return el;
          };

          const onClick = () => handleClick(index, inputRefs);

          return (
            <input
              key={index}
              type="text"
              maxLength="1"
              className={className}
              value={digit}
              placeholder={placeholder}
              onChange={onChangeInput}
              name={`effector-${name}-${index}`}
              ref={onRef}
              onClick={onClick}
              disabled={disabled}
              {...restProps}
            />
          );
        })}
      </div>

      {hasError(firstError) && !isEmpty(errorText) ? (
        <p className="input-group__error">
          {t(errorText)}
        </p>
      ) : null}

      {!hasError(firstError) && !isEmpty(caption) ? (
        <p>{t(caption)}</p>
      ) : null}
    </div>
  );
};

InputChars.defaultProps = {
  placeholder: '',
  activeClass: '',
  nonActiveClass: '',
  digits: 6,
  conditionClass: false,
  onChange: () => {},
  value: ['', '', '', '', '', ''],
  errorText: '',
  hasError: (error) => error !== null,
  firstError: null,
  caption: '',
  disabled: false,
};