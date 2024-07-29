import { $headerAnimationComplete, setHeaderAnimationStateFn } from '.';

$headerAnimationComplete.on(setHeaderAnimationStateFn, (_, complete) => complete);
