import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import './index.css';

// Needed for onTouchTap/material-ui http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
