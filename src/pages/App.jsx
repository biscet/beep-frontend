import React, { Suspense } from 'react';
import { useGate, useUnit } from 'effector-react';
import {
  BrowserRouter, Switch, Redirect, useLocation,
} from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { CRUD_PATH, PAGES_PATH } from 'src/dict/path';
import { AppGate } from 'src/models/App';
import {
  PrivateRoute,
  BasicRoute as Route,
  BasicDocsRoute as DocsRoute,
} from 'src/ui/components/Routes';
import {
  Helmet, I18nProvider, Modal,
} from 'src/ui/components/Helpers';
import { AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { $isWebPage } from 'src/models/Web';
import { $isDocsPage } from 'src/models/Docs';

import { Header } from 'src/ui/blocks/Header';
import { Sidebar } from 'src/ui/blocks/Sidebar';

import { Default } from './children/Default';
import { Login } from './children/Login/Login';
import { Registration } from './children/Registration';
import { WebRoutes } from './children/Web/WebRoutes';
import { Offer } from './children/Offer';
import { Privacy } from './children/Privacy';
import { Prices } from './children/Prices';

const {
  DEFAULT, LOGIN, REGISTRATION, PRICES,
  WEB, OFFER, PRIVACY,
} = PAGES_PATH;

const Routes = () => {
  const location = useLocation();
  const [isWebPage, isDocsPage] = useUnit([$isWebPage, $isDocsPage]);

  return (
    <Suspense fallback="">
      {!isWebPage && !isDocsPage ? <Header /> : null}
      {isWebPage && !isDocsPage && !location.pathname.includes(CRUD_PATH.BUY_PACKS) ? <Sidebar /> : null}

      <Modal />

      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={`/${LOGIN}`} component={Login} exact />
          <Route path={`/${DEFAULT}`} component={Default} exact />
          <Route path={`/${REGISTRATION}`} component={Registration} exact />
          <Route path={`/${PRICES}`} component={Prices} exact />

          <DocsRoute path={`/${OFFER}`} component={Offer} exact />
          <DocsRoute path={`/${PRIVACY}`} component={Privacy} exact />

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
