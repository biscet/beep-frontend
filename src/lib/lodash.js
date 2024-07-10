export const isEmpty = (obj) => [Object, Array].includes((obj || {}).constructor)
    && Object.entries((obj || {})).length === 0;

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
