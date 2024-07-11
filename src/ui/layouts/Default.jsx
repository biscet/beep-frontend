import React from 'react';
import { useGate } from 'effector-react';
import { get } from 'src/lib/lodash';
import { RouteGate } from 'src/models/App';

const DefaultLayout = ({ children }) => {
  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
  });

  return <>{children}</>;
};

export { DefaultLayout };
