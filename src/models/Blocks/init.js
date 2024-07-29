import { sample } from 'effector';
import { debounce } from 'patronum';
import {
  $headerAnimationComplete, $isHovereLogout, setHeaderAnimationStateFn, setIsHovereLogoutFn, triggerLogoutFn,
} from '.';
import { closeModalFn } from '../Helpers/Modal';
import { logoutFn } from '../User';

$headerAnimationComplete.on(setHeaderAnimationStateFn, (_, complete) => complete);

$isHovereLogout.on(setIsHovereLogoutFn, (_, isHovered) => isHovered);

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