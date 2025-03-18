import React from 'react';
import { useUnit } from 'effector-react';
import {
  Redirect, Route, Switch, withRouter, useLocation,
} from 'react-router-dom';
import { get, isEmpty } from 'src/lib/lodash';
import { ROUTES_FIELDS, WEB_PATH } from 'src/dict/path';
import { $itemsRoutesWeb } from 'src/models/Web';

import { ProjectsRoutes } from './children/Projects/ProjectsRoutes';
import { PresetsRoutes } from './children/Presets/PresetsRoutes';
import { PaymentRoutes } from './children/Payment/PaymentRoutes';

const { PATH } = ROUTES_FIELDS;
const { PRESETS, PROJECTS, PAYMENT } = WEB_PATH;

const pathMap = {
  [PRESETS]: PresetsRoutes,
  [PROJECTS]: ProjectsRoutes,
  [PAYMENT]: PaymentRoutes,
};

export const WebRoutes = withRouter(({ match: { url } }) => {
  const location = useLocation();
  const routes = useUnit($itemsRoutesWeb).filter((route) => !isEmpty(route[PATH]));
  const baseUrl = url.slice(-1) === '/' ? url.slice(0, Math.max(0, url.length - 1)) : url;
  const defaultPath = PROJECTS;

  return (
    <Switch location={location} key={location.pathname}>
      {routes.map(
        ({ [PATH]: path }) => (
          <Route
            key={`${path}_route_web`}
            path={`${baseUrl}/${path}`}
            component={get(pathMap, path, '')}
          />
        ),
      )}

      <Redirect exact to={`${baseUrl}/${defaultPath}`} />
    </Switch>
  );
});
