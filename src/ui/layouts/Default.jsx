import React from 'react';
import { useGate } from 'effector-react';
import { get } from 'src/lib/lodash';
import { RouteGate } from 'src/models/App';
import { Header } from 'src/ui/blocks/Header';

const DefaultLayout = ({ children }) => {
  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
  });

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export { DefaultLayout };
