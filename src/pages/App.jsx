import React, { Suspense } from 'react';
import { useGate } from 'effector-react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { PAGES_PATH } from 'src/dict/path';
import { AppGate } from 'src/models/App';
import { BasicRoute as Route } from 'src/ui/components/Routes';
import Helmet from 'src/ui/components/Helmet';
import { Default } from './children/Default';

const { DEFAULT } = PAGES_PATH;

export const App = () => {
  useGate(AppGate, {
    firstPage: get(window, 'location.pathname', ''),
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
  });

  return (
    <BrowserRouter>
      <Helmet />

      <Suspense fallback="...">
        <Switch>
          <Route path={`/${DEFAULT}`} component={Default} exact />
          <Redirect to={`/${DEFAULT}`} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
