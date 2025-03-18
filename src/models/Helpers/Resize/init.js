import { $innerSizes, changeInnterSizesFn } from '.';

$innerSizes.on(changeInnterSizesFn, () => (
  { width: window.innerWidth, height: window.innerHeight }
));

let timer;

window.addEventListener('resize', () => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    changeInnterSizesFn();
  }, 50);
});