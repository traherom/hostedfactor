import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import NoMatch from './containers/NoMatch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  handleLogin = (user, pw) => {
    this.setState({
      user: {
        name: 'Ryan Morehart',
      }
    });
  }

  handleLogout = () => this.setState({user: null});

  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={NoMatch}/>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
