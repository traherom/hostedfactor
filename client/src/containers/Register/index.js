import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {
  performRegister,
  setUsernameValue, setUsernameMessage,
  setPasswordValue, setPasswordMessage,
  setPassword2Value, setPassword2Message,
} from '../../actions/user';
import SiteTemplate from '../../components/SiteTemplate';
import ModalProgressDialog from '../../components/ModalProgressDialog';

class RegisterCore extends Component {
  handleLoginClick = () => { browserHistory.push('/login'); }

  handleRegisterClick = () => {
    // Ensure values are valid
    const user = this.props.user.status.usernameValue;
    const pw1 = this.props.user.status.passwordValue;
    const pw2 = this.props.user.status.password2Value;
    if(!user) {
      this.props.onInvalidUser('Username must not be blank');
      return;
    }
    this.props.onInvalidUser();

    if(!pw1) {
      this.props.onInvalidPassword('Password must not be blank');
      return;
    }
    if(pw1.length < 8) {
      this.props.onInvalidPassword('Password must be at least 8 characters');
      return;
    }
    this.props.onInvalidPassword();

    if(pw1 !== pw2) {
      this.props.onInvalidPassword2('Both passwords must match');
      return;
    }
    this.props.onInvalidPassword2();

    this.props.onRegister(user, pw1);
  }

  render() {
    let statusMsg = '';
    const status = this.props.user.status;
    if(status.registering) {
      if(status.generatingKey)
        statusMsg = 'Generating Encryption Key';
      else if(status.generatingCreds)
        statusMsg = 'Deriving Login Key';
      else
        statusMsg = 'Processing';
    }

    return (
      <SiteTemplate
        element={
          <div className="Login">
            <TextField
              floatingLabelText="Username"
              fullWidth={true}
              value={status.usernameValue}
              onChange={(e) => this.props.onUsernameChange(e.target.value)}
              errorText={status.usernameMessage}
            />
            <TextField
              floatingLabelText="Password"
              fullWidth={true}
              type="password"
              value={status.passwordValue}
              onChange={(e) => this.props.onPasswordChange(e.target.value)}
              errorText={status.passwordMessage}
            />
            <TextField
              floatingLabelText="Password (again)"
              fullWidth={true}
              type="password"
              value={status.password2Value}
              onChange={(e) => this.props.onPassword2Change(e.target.value)}
              errorText={status.password2Message}
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

            <ModalProgressDialog
              title='Logging in'
              message={statusMsg}
              open={status.loggingIn}
            />
          </div>
        }
      />
    );
  }
}

RegisterCore.propTypes = {
  user: React.PropTypes.shape({
    status: React.PropTypes.shape({
      registering: React.PropTypes.bool.isRequired,

      usernameValue: React.PropTypes.string.isRequired,
      usernameMessage: React.PropTypes.string.isRequired,
      passwordValue: React.PropTypes.string.isRequired,
      passwordMessage: React.PropTypes.string.isRequired,
      password2Value: React.PropTypes.string.isRequired,
      password2Message: React.PropTypes.string.isRequired,

      generatingKey: React.PropTypes.bool.isRequired,
      generatingCreds: React.PropTypes.bool.isRequired,
      percentage: React.PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  onRegister: React.PropTypes.func.isRequired,
  onInvalidUser: React.PropTypes.func.isRequired,
  onInvalidPassword: React.PropTypes.func.isRequired,
  onInvalidPassword2: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (user, pw) => dispatch(performRegister(user, pw)),
    onUsernameChange: (val) => dispatch(setUsernameValue(val)),
    onPasswordChange: (val) => dispatch(setPasswordValue(val)),
    onPassword2Change: (val) => dispatch(setPassword2Value(val)),
    onInvalidUser: (msg) => dispatch(setUsernameMessage(msg)),
    onInvalidPassword: (msg) => dispatch(setPasswordMessage(msg)),
    onInvalidPassword2: (msg) => dispatch(setPassword2Message(msg)),
  };
};

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterCore);
export default Register;
