export const isEmpty = (obj) => [Object, Array].includes((obj || {}).constructor)
    && Object.entries((obj || {})).length === 0;

export const isObject = (value) => {
  const type = typeof value;
  return !!value && (type === 'object' || type === 'function');
};

export const get = (object, path, value) => {
  if ([null, undefined, {}].includes(path)) {
    return value;
  }

  const pathArray = Array.isArray(path) ? path : path.split('.').filter(Boolean);
  const pathArrayFlat = pathArray.flatMap((part) => (typeof part === 'string' ? part.split('.') : part));
  const checkValue = pathArrayFlat.reduce((obj, key) => obj && obj[key], object);

  return checkValue === undefined ? value : checkValue;
};

export const intersection = (a, b) => a.filter((value) => b.includes(value));

export const isArray = (value) => !!value && value.constructor === Array;

export const strTrim = (str) => str.trim();

export const cx = ({
  defaultClass, activeClass, nonActiveClass, condition = true,
}) => {
  const className = isArray(defaultClass) ? [...defaultClass] : defaultClass.split(' ');
  const pushCondition = isEmpty(nonActiveClass) ? '' : nonActiveClass;
  className.push(condition ? activeClass : pushCondition);
  return className.join(' ');
};
