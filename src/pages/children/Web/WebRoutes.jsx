import React from 'react';
import { useUnit } from 'effector-react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import { get, isEmpty } from 'src/lib/lodash';
import { WEB_PATH } from 'src/dict/path';
import { $itemsRoutesWeb } from 'src/models/Web';
import { Dashboard } from './children/Dashboard';

const { DASHBOARD } = WEB_PATH;

const pathMap = {
  [DASHBOARD]: Dashboard,
};

export const WebRoutes = withRouter(({ match: { url } }) => {
  const routes = useUnit($itemsRoutesWeb).filter((item) => !isEmpty(item.path));
  const baseUrl = url.slice(-1) === '/' ? url.slice(0, Math.max(0, url.length - 1)) : url;
  const defaultPath = DASHBOARD;

  return (
    <Switch>
      {routes.map(
        ({ path }) => (
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
