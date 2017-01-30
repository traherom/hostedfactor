import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {
  performLogin, setUsernameMessage, setPasswordMessage, setUsernameValue, setPasswordValue
} from '../../actions/user';
import SiteTemplate from '../../components/SiteTemplate';
import ModalProgressDialog from '../../components/ModalProgressDialog';

class LoginCore extends Component {
  handleLoginClick = () => {
    // Ensure values are valid
    const user = this.props.user.status.usernameValue;
    const pw = this.props.user.status.passwordValue;
    if(!user) {
      this.props.onInvalidUser('Username must not be blank');
      return;
    }
    this.props.onInvalidUser();

    if(!pw) {
      this.props.onInvalidPassword('Password must not be blank');
      return;
    }
    this.props.onInvalidPassword();

    this.props.onLogin(user, pw);
  }

  handleRegisterClick = () =>  { browserHistory.push('/register'); }

  render() {
    let statusMsg = '';
    const status = this.props.user.status;
    if(status.loggingIn) {
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

LoginCore.propTypes = {
  user: React.PropTypes.shape({
    status: React.PropTypes.shape({
      loggingIn: React.PropTypes.bool.isRequired,

      usernameValue: React.PropTypes.string.isRequired,
      usernameMessage: React.PropTypes.string.isRequired,
      passwordValue: React.PropTypes.string.isRequired,
      passwordMessage: React.PropTypes.string.isRequired,

      generatingKey: React.PropTypes.bool.isRequired,
      generatingCreds: React.PropTypes.bool.isRequired,
      percentage: React.PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  onLogin: React.PropTypes.func.isRequired,
  onInvalidUser: React.PropTypes.func.isRequired,
  onInvalidPassword: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, pw) => dispatch(performLogin(user, pw)),
    onUsernameChange: (val) => dispatch(setUsernameValue(val)),
    onPasswordChange: (val) => dispatch(setPasswordValue(val)),
    onInvalidUser: (msg) => dispatch(setUsernameMessage(msg)),
    onInvalidPassword: (msg) => dispatch(setPasswordMessage(msg)),
  };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginCore);
export default Login;
