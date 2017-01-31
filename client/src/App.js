import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducer from './reducers';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import NoMatch from './containers/NoMatch';

// Setup store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router history={history}>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="*" component={NoMatch}/>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
