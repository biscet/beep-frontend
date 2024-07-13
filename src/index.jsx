import React from 'react';
import ReactDOM from 'react-dom';

import './models/init';

import 'src/ui/styles/index.scss';

import { App } from 'src/pages/App';

import 'src/lib/react-helpers';

import { setLoadAppliactionStateFn } from './models/App';

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('load', () => {
  if (document.readyState === 'complete') {
    setLoadAppliactionStateFn(true);
  }
});