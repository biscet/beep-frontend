import React from 'react';
import { useUnit } from 'effector-react';
import {
  Redirect, Route, Switch, withRouter, useLocation,
} from 'react-router-dom';
import { get, isEmpty } from 'src/lib/lodash';
import { CRUD_PATH, ROUTES_FIELDS } from 'src/dict/path';
import { $itemsRoutesPayment } from 'src/models/Payment';

import { Packs } from './Packs';
import { BuyPack } from './BuyPack';

const { PATH } = ROUTES_FIELDS;
const { PACKS, BUY_PACKS } = CRUD_PATH;

const pathMap = {
  [PACKS]: Packs,
  [BUY_PACKS]: BuyPack,
};

export const PaymentRoutes = withRouter(({ match: { url } }) => {
  const location = useLocation();
  const routes = useUnit($itemsRoutesPayment).filter((route) => !isEmpty(route[PATH]));
  const baseUrl = url.slice(-1) === '/' ? url.slice(0, Math.max(0, url.length - 1)) : url;
  const defaultPath = PACKS;

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
