export const isCurrentPath = (path, value = '') => {
  const arrPath = path.split('/');
  return arrPath.includes(value);
};