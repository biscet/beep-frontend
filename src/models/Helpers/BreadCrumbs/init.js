import { sample } from 'effector';
import { $pathnameUrl } from 'src/models/App';
import { $breadCrumbs } from '.';

sample({
  clock: $pathnameUrl,
  fn: () => [],
  target: $breadCrumbs,
});