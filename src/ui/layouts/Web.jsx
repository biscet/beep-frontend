import React from 'react';
import { useGate } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { RouteGate } from 'src/models/App';
import { LayoutGroup } from 'framer-motion';

import { Sidebar } from 'src/ui/blocks/Sidebar';
import { SidebarHeader } from 'src/ui/blocks/SidebarHeader';

const WebLayout = ({ children }) => {
  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    history: useHistory(),
  });

  return (
    <LayoutGroup id="web">
      <Sidebar />

      <div className="web-content">
        <SidebarHeader />
        {children}
      </div>
    </LayoutGroup>
  );
};

export { WebLayout };
