import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { performLogin } from '../../actions/user';
import SiteTemplate from '../../components/SiteTemplate';

class LoginCore extends Component {
  handleLoginClick = () => {
    this.props.handleLogin(this.userInput.input.value, this.pwInput.input.value);
  }

  handleRegisterClick = () =>  { browserHistory.push('/register'); }

  render() {
    return (
      <SiteTemplate
        element={
          <div className="Login">
            <TextField
              floatingLabelText="Username"
              fullWidth={true}
              ref={(userInput) => this.userInput = userInput }
            />
            <TextField
              floatingLabelText="Password"
              fullWidth={true}
              type="password"
              ref={(pwInput) => this.pwInput = pwInput }
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

LoginCore.propTypes = {
  handleLogin: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (user, pw) => {
      dispatch(performLogin(user, pw));
    },
  }
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginCore);
export default Login;
