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
  fieldName, props: { fields, errorText },
}) => ({
  errorText: errorText(fieldName),
  firstError: fields[fieldName].firstError,
  ...(getEventsField(get(fields, fieldName))),
});

export const getReflectPropsField = (fieldName, form) => ({
  errorText: form.fields[fieldName].$errorText,
  firstError: form.fields[fieldName].$firstError,
  onBlur: form.fields[fieldName].onBlur,
  onChange: form.fields[fieldName].onChange,
  value: form.fields[fieldName].$value,
});

export const createFx = (data, timeout) => new Promise((resolve) => {
  setTimeout(() => { resolve(data); }, timeout);
});
