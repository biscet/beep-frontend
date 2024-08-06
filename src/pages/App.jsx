import React, { Suspense } from 'react';
import { useGate, useUnit } from 'effector-react';
import {
  BrowserRouter, Switch, Redirect, useLocation,
} from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { PAGES_PATH } from 'src/dict/path';
import { AppGate } from 'src/models/App';
import { PrivateRoute, BasicRoute as Route } from 'src/ui/components/Routes';
import {
  Helmet, I18nProvider, Modal,
} from 'src/ui/components/Helpers';
import { AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';

import { Header } from 'src/ui/blocks/Header';
import { $isWebPage } from 'src/models/Web';
import { Sidebar } from 'src/ui/blocks/Sidebar';
import { Default } from './children/Default';
import { Login } from './children/Login';
import { Registration } from './children/Registration';
import { WebRoutes } from './children/Web/WebRoutes';

const {
  DEFAULT, LOGIN, REGISTRATION, WEB,
} = PAGES_PATH;

const Routes = () => {
  const location = useLocation();
  const isWebPage = useUnit($isWebPage);

  return (
    <Suspense fallback="">
      {!isWebPage ? <Header /> : <Sidebar />}

      <Modal />

      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={`/${LOGIN}`} component={Login} exact />
          <Route path={`/${DEFAULT}`} component={Default} exact />
          <Route path={`/${REGISTRATION}`} component={Registration} exact />

          <PrivateRoute path={`/${WEB}`} component={WebRoutes} />

          <Redirect to={`/${DEFAULT}`} />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
};

export const App = () => {
  useGate(AppGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    enqueueSnackbar: toast,
  });

  return (
    <I18nProvider>
      <BrowserRouter>
        <Helmet />
        <ToastContainer />

        <Routes />
      </BrowserRouter>
    </I18nProvider>
  );
};
