import React from 'react';
import { useUnit } from 'effector-react';
import {
  Redirect, Route, Switch, withRouter, useLocation,
} from 'react-router-dom';
import { get, isEmpty } from 'src/lib/lodash';
import { CRUD_PATH, ROUTES_FIELDS } from 'src/dict/path';
import { $itemsRoutesProjects } from 'src/models/Web/Projects';

import { Catalog } from './children/Catalog';
import { Uploading } from './children/Uploading';

const { PATH } = ROUTES_FIELDS;
const { CATALOG, UPLOADING } = CRUD_PATH;

const pathMap = {
  [CATALOG]: Catalog,
  [UPLOADING]: Uploading,
};

export const ProjectsRoutes = withRouter(({ match: { url } }) => {
  const location = useLocation();
  const routes = useUnit($itemsRoutesProjects).filter((route) => !isEmpty(route[PATH]));
  const baseUrl = url.slice(-1) === '/' ? url.slice(0, Math.max(0, url.length - 1)) : url;
  const defaultPath = CATALOG;

  return (
    <Switch location={location} key={location.pathname}>
      {routes.map(
        ({ [PATH]: path }) => {
          const crud = [UPLOADING].includes(path) ? `:id/${path}` : path;

          return (
            <Route
              key={`${path}_route_web`}
              path={`${baseUrl}/${crud}`}
              component={get(pathMap, path, '')}
            />
          );
        },
      )}

      <Redirect exact to={`${baseUrl}/${defaultPath}`} />
    </Switch>
  );
});
