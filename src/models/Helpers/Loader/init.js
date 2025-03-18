import { sample } from 'effector';
import { $initApp } from 'src/models/App';
import { debounce } from 'patronum';
import {
  $layoutLoader, $pagesLoader, changeLayoutLoaderFn, changePagesLoaderFn,
} from '.';

$layoutLoader.on(changeLayoutLoaderFn, (_, loader) => loader);

$pagesLoader.on(changePagesLoaderFn, (_, loader) => loader);

sample({
  clock: debounce({
    source: $initApp,
    timeout: 150,
  }),
  filter: (initApp) => initApp,
  target: changeLayoutLoaderFn.prepend(() => false),
});