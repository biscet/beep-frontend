import React, { Suspense } from 'react';
import { useGate } from 'effector-react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { PAGES_PATH } from 'src/dict/path';
import { AppGate } from 'src/models/App';
import { BasicRoute as Route } from 'src/ui/components/Routes';
import { Helmet, I18nProvider, Theme } from 'src/ui/components/Helpers';

import { Default } from './children/Default';

const { DEFAULT } = PAGES_PATH;

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

        <Suspense fallback="...">
          <Switch>
            <Route path={`/${DEFAULT}`} component={Default} exact />
            <Redirect to={`/${DEFAULT}`} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  );
};
