/* eslint-disable no-plusplus */
import React from 'react';
import ReactDOM from 'react-dom';

import './models/init';

import 'src/ui/styles/index.scss';

import { App } from 'src/pages/App';

import 'src/lib/react-helpers';

import { setLoadAppliactionStateFn } from './models/App';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}

window.addEventListener('load', () => {
  if (document.readyState === 'complete') {
    setLoadAppliactionStateFn(true);
  }
});