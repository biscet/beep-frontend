import React from 'react';
import { useGate } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { get } from 'src/lib/lodash';
import { WebGate } from 'src/models/App';
import { LoaderLayout } from '../components/Helpers/Loaders';

const PaymentLayout = ({ children }) => {
  useGate(WebGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    history: useHistory(),
  });

  return (
    <>
      {children}
      <LoaderLayout />
    </>
  );
};

export { PaymentLayout };
