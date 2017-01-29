import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SiteTemplate from '../../components/SiteTemplate';

class Register extends Component {
  handleLoginClick = () => { browserHistory.push('/login'); }
  handleRegisterClick = () => { }

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
            <TextField
              floatingLabelText="Password (again)"
              fullWidth={true}
              type="password"
            />
            <RaisedButton
              label="Register"
              primary={true}
              onClick={this.handleRegisterClick}
            />
            <br />
            <FlatButton
              label="Alread have an account? Login"
              onClick={this.handleLoginClick}
            />
          </div>
        }
      />
    );
  }
}

export default Register;
