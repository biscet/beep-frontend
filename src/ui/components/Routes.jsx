import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { get, intersection, isEmpty } from 'src/lib/lodash';
import { PAGES_PATH, WEB_PATH } from 'src/dict/path';
import { ErrorBoundary } from 'src/ui/components/ErrorBoundary';
import { useUnit } from 'effector-react';
import { $isAuthenticated } from 'src/models/Login';

import { DefaultLayout } from 'src/ui/layouts/Default';
import { WebLayout } from 'src/ui/layouts/Web';

const { LOGIN, REGISTRATION } = PAGES_PATH;
const { DASHBOARD } = WEB_PATH;

export const paths = [{
  routes: [LOGIN, REGISTRATION],
  component: DefaultLayout,
},
{
  routes: [DASHBOARD],
  component: WebLayout,
}];

export const getLayout = (pathname) => {
  const list = pathname.split('/');
  const element = paths.filter((item) => !isEmpty(intersection(item.routes, list)));
  return element.length > 0 ? element[0].component : DefaultLayout;
};

export const BasicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const Layout = getLayout(get(props, 'location.pathname'));

      return (
        <Layout>
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        </Layout>
      );
    }}
  />
);

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useUnit($isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) => {
        const Layout = getLayout(get(props, 'location.pathname'));

        return isAuthenticated ? (
          <Layout>
            <ErrorBoundary>
              <Component {...props} />
            </ErrorBoundary>
          </Layout>
        ) : (
          <Redirect to={`/${LOGIN}`} />
        );
      }}
    />
  );
};
