import { useEffect } from 'react';

export const listUpContainerHook = (ref, isLoading, trigger) => {
  useEffect(() => {
    if (ref.current && !isLoading) {
      ref.current.scrollTo({
        top: 0,
      });
    }
  }, trigger);

  return null;
};