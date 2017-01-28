import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './containers/Home/Home.js';
import NoMatch from './containers/404/404.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="*" component={NoMatch}/>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
