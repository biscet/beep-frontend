import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { rootContainer } from 'src/dict/config';
import { isEmpty } from 'src/lib/lodash';

export const ScrollToTop = ({ container }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isEmpty(container)) {
      container.scrollTo(0, 0);
    } else {
      rootContainer.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};