import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import SignInButton from '../../components/SignInButton/SignInButton';

class LoggedInMenu extends Component {
  handleChange = (open) => { open ? this.props.onOpen() : this.props.onClose() }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        open={this.props.open}
        onRequestChange={this.handleChange}
      >
        <MenuItem primaryText="Add Item" />
        <Divider />
        <MenuItem primaryText="Sign Out" onClick={this.props.onLogout} />
      </IconMenu>
    );
  }
}

LoggedInMenu.propTypes = {
  open: React.PropTypes.bool.isRequired,

  onOpen: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onLogout: React.PropTypes.func.isRequired,
};

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <AppBar
          title="HostedFactor"
          showMenuIconButton={false}
          iconElementRight={
            this.props.user.status.loggedIn ?
              <LoggedInMenu
                open={this.props.menuOpen}
                onOpen={this.props.onMenuOpen}
                onClose={this.props.onMenuClose}
                onLogout={this.props.onLogout}
              />
              :
              <SignInButton />
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,

  menuOpen: React.PropTypes.bool.isRequired,

  onMenuOpen: React.PropTypes.func.isRequired,
  onMenuClose: React.PropTypes.func.isRequired,
  onLogout: React.PropTypes.func.isRequired,
};

export default Header;
