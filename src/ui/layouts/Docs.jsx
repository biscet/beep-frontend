import React from 'react';
import { useGate } from 'effector-react';
import { get } from 'src/lib/lodash';
import { RouteGate } from 'src/models/App';
import { useHistory } from 'react-router-dom';

import { DocsHeader } from '../blocks/DocsHeader';

const DocsLayout = ({ children }) => {
  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    history: useHistory(),
  });

  return (
    <div className="docs-layout">
      <DocsHeader />

      {children}
    </div>
  );
};

export { DocsLayout };
