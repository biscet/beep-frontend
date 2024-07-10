import React from 'react';
import ReactDOM from 'react-dom';

import './models/init';

import 'src/ui/styles/index.scss';

import { App } from 'src/pages/App';

import 'src/lib/react-helpers';

ReactDOM.render(<App />, document.getElementById('root'));