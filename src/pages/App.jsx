import React, { Suspense } from 'react';
import { useGate } from 'effector-react';
import {
  BrowserRouter, Switch, Redirect, useLocation,
} from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { PAGES_PATH } from 'src/dict/path';
import { AppGate } from 'src/models/App';
import { BasicRoute as Route } from 'src/ui/components/Routes';
import { Helmet, I18nProvider, Theme } from 'src/ui/components/Helpers';
import { AnimatePresence } from 'framer-motion';

import { Default } from './children/Default';
import { Login } from './children/Login';
import { Registration } from './children/Registration';

const { DEFAULT, LOGIN, REGISTRATION } = PAGES_PATH;

const Routes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path={`/${LOGIN}`} component={Login} exact />
        <Route path={`/${DEFAULT}`} component={Default} exact />
        <Route path={`/${REGISTRATION}`} component={Registration} exact />

        <Redirect to={`/${DEFAULT}`} />
      </Switch>
    </AnimatePresence>
  );
};

export const App = () => {
  useGate(AppGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
  });

  return (
    <I18nProvider>
      <BrowserRouter>
        <Helmet />
        <Theme />

        <Suspense fallback="">
          <Routes />
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  );
};
