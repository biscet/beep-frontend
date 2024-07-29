import React from 'react';
import { useUnit } from 'effector-react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import { get, isEmpty } from 'src/lib/lodash';
import { ROUTES_FIELDS, WEB_PATH } from 'src/dict/path';
import { $itemsRoutesWeb } from 'src/models/Web';

import { Dashboard } from './children/Dashboard';
import { Projects } from './children/Projects/Projects';

const { PATH } = ROUTES_FIELDS;
const { DASHBOARD, PROJECTS } = WEB_PATH;

const pathMap = {
  [DASHBOARD]: Dashboard,
  [PROJECTS]: Projects,
};

export const WebRoutes = withRouter(({ match: { url } }) => {
  const routes = useUnit($itemsRoutesWeb).filter((route) => !isEmpty(route[PATH]));
  const baseUrl = url.slice(-1) === '/' ? url.slice(0, Math.max(0, url.length - 1)) : url;
  const defaultPath = PROJECTS;

  return (
    <Switch>
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
