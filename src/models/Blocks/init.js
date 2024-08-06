import { sample } from 'effector';
import { debounce } from 'patronum';
import { rootContainer } from 'src/dict/config';
import {
  $headerAnimationComplete, $isHovereLogout, setHeaderAnimationStateFn,
  setIsHovereLogoutFn, triggerLogoutFn, $scrolledRoot,
  setScrolledRootFn, rootScrolledEvent,
} from '.';
import { closeModalFn } from '../Helpers/Modal';
import { logoutFn } from '../User';
import { RouteGate, WebGate } from '../App';

$headerAnimationComplete.on(setHeaderAnimationStateFn, (_, complete) => complete);

$isHovereLogout.on(setIsHovereLogoutFn, (_, isHovered) => isHovered);

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
  target: setIsHovereLogoutFn,
});