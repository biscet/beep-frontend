import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { rootContainer } from 'src/dict/config';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => () => rootContainer.scrollTo(0, 0), [pathname]);
  return null;
};