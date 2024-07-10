import React from 'react';
import { Route } from 'react-router-dom';
import { get, intersection, isEmpty } from 'src/lib/lodash';
import { PAGES_PATH } from 'src/dict/path';
import { DefaultLayout } from 'src/ui/layouts/Default';
import { ErrorBoundary } from 'src/ui/components/ErrorBoundary';

const { DEFAULT } = PAGES_PATH;

export const paths = [{
  routes: [DEFAULT],
  component: DefaultLayout,
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