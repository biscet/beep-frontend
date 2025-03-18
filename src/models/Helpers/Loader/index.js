import { createFactory } from '@withease/factories';
import { sample } from 'effector';
import { isEmpty } from 'src/lib/lodash';
import { allDomain } from 'src/models/App';

const loaderDomain = allDomain.createDomain('Loader');

export const changeLayoutLoaderFn = loaderDomain.createEvent();

export const changePagesLoaderFn = loaderDomain.createEvent();

export const $layoutLoader = loaderDomain.createStore(true);

export const $pagesLoader = loaderDomain.createStore(false);

export const loaderPagesFb = createFactory(({ $page, $isLoading }) => {
  if (isEmpty($page)) {
    sample({
      clock: $isLoading,
      filter: (isLoading) => isLoading === false,
      target: changePagesLoaderFn.prepend(() => false),
    });

    sample({
      clock: $isLoading,
      filter: (isLoading) => isLoading === true,
      target: changePagesLoaderFn.prepend(() => true),
    });
  } else {
    sample({
      clock: $isLoading,
      source: $page,
      filter: (page, isLoading) => page && isLoading === false,
      target: changePagesLoaderFn.prepend(() => false),
    });

    sample({
      clock: $isLoading,
      source: $page,
      filter: (page, isLoading) => page && isLoading === true,
      target: changePagesLoaderFn.prepend(() => true),
    });
  }
});