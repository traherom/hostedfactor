import React, { Component } from 'react';
import { connect } from 'react-redux'

import Header from '../../components/Header/Header';
import './SiteTemplate.css';

class SiteTemplateCore extends Component {
  render() {
    return (
      <div className="SiteTemplate">
        <Header {...this.props} />
        <main>
          {this.props.element}
        </main>
      </div>
    );
  }
}

SiteTemplateCore.propTypes = {
  element: React.PropTypes.element.isRequired,

  user: React.PropTypes.any, // null or an object
  menuOpen: React.PropTypes.bool.isRequired,

  onMenuOpen: React.PropTypes.func.isRequired,
  onMenuClose: React.PropTypes.func.isRequired,
  onLogout: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    menuOpen: state.ui.menuOpen,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMenuOpen: () => dispatch({ type: 'MENU_OPEN' }),
    onMenuClose: () => dispatch({ type: 'MENU_CLOSE' }),
    onLogout: () => dispatch({ type: 'LOGOUT' }),
  };
}

const SiteTemplate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SiteTemplateCore);

export default SiteTemplate;
