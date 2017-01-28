import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import SignInButton from '../../components/SignInButton/SignInButton';

class LoggedInMenu extends Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        open={this.state.openMenu}
      >
        <MenuItem primaryText="Add Item" />
        <Divider />
        <MenuItem primaryText="Sign Out" />
      </IconMenu>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      openMenu: false,
    };
  }

  handleDrawerToggle = () => this.setState({openDrawer: !this.state.openDrawer});
  handleDrawerClose = () => this.setState({openDrawer: false});

  handleMenuToggle = () => this.setState({openMenu: !this.state.openMenu});
  handleMenuClose = () => this.setState({openMenu: false});

  render() {
    return (
        <div className="Header">
          <AppBar
            title="HostedFactor"
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
            iconElementRight={this.props.loggedIn ? <LoggedInMenu /> : <SignInButton />}
          />

          <Drawer
            docked={false}
            open={this.state.openDrawer}
            onRequestChange={(openDrawer) => this.setState({openDrawer})}
          >
            <AppBar showMenuIconButton={false} />
            <MenuItem onTouchTap={this.handleDrawerClose}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleDrawerClose}>Menu Item 2</MenuItem>
          </Drawer>
        </div>
    );
  }
}

export default Header;
