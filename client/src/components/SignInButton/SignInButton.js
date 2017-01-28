import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import FlatButton from 'material-ui/FlatButton';

class SignInButton extends Component {
  static muiName = 'FlatButton';

  handleClick = () => { browserHistory.push('/login'); }

  render() {
    return (
      <FlatButton
        {...this.props}
        label='Login'
        onClick={this.handleClick}
      />
    );
  }
}

export default SignInButton;
