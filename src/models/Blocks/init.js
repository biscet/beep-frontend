import { sample } from 'effector';
import { debounce } from 'patronum';
import { rootContainer } from 'src/dict/config';
import {
  $headerAnimationComplete, $isHoveredLogout, setHeaderAnimationStateFn,
  setIsHoveredLogoutFn, triggerLogoutFn, $scrolledRoot,
  setScrolledRootFn, rootScrolledEvent,
  $webLayoutPaddingCondition,
  $webLayoutPaddingConditionCombineData,
} from '.';
import { closeModalFn } from '../Helpers/Modal';
import { logoutFn } from '../Helpers/Logout';
import { RouteGate, WebGate } from '../App';

$headerAnimationComplete.on(setHeaderAnimationStateFn, (_, complete) => complete);

$isHoveredLogout.on(setIsHoveredLogoutFn, (_, isHovered) => isHovered);

$scrolledRoot.on(setScrolledRootFn, (_, isScrolled) => isScrolled);

sample({
  clock: triggerLogoutFn,
  target: closeModalFn,
});

sample({
  clock: debounce({
    source: triggerLogoutFn,
    timeout: 150,
  }),
  target: logoutFn,
});

sample({
  clock: RouteGate.open,
  fn: () => {
    rootContainer.addEventListener('scroll', rootScrolledEvent);
    return null;
  },
});

sample({
  clock: RouteGate.close,
  fn: () => {
    rootContainer.removeEventListener('scroll', rootScrolledEvent);
    return false;
  },
  target: setScrolledRootFn,
});

sample({
  clock: WebGate.close,
  fn: () => false,
  target: setIsHoveredLogoutFn,
});

sample({
  clock: debounce({
    source: $webLayoutPaddingConditionCombineData,
    timeout: 150,
  }),
  fn: (pages) => pages.some(Boolean),
  target: $webLayoutPaddingCondition,
});