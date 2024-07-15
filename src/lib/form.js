import { get } from 'src/lib/lodash';

const getValue = (f) => (e) => f(get(e, 'target.value', get(e, 'target.checked', e)));

const onChangeField = (field) => (val) => field.onChange(val);

const onBlurField = (field) => () => field.onBlur();

const getEventsField = (field) => ({
  onBlur: onBlurField(field),
  onChange: getValue(onChangeField(field)),
  value: get(field, 'value', ''),
});

export const onSubmit = (submit) => (e) => {
  e.preventDefault();
  submit();
};

export const getPropsField = ({
  fieldName, props: { fields, errorText, hasError },
}) => ({
  errorText: errorText(fieldName),
  hasError: hasError(fieldName),
  ...(getEventsField(get(fields, fieldName))),
});
