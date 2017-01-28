import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SiteTemplate from '../../components/SiteTemplate/SiteTemplate';

class Login extends Component {
  handleLoginClick = () => {}
  handleRegisterClick = () => { browserHistory.push('/register'); }

  render() {
    return (
      <SiteTemplate
        element={
          <div className="Login">
            <TextField
              floatingLabelText="Username"
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Password"
              fullWidth={true}
              type="password"
            />
            <RaisedButton
              label="Login"
              primary={true}
              onClick={this.handleLoginClick}
            />
            <br />
            <FlatButton
              label="No account? Register"
              onClick={this.handleRegisterClick}
            />
          </div>
        }
      />
    );
  }
}

export default Login;
