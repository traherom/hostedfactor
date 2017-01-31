import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { fetchCodes } from '../../actions/codes';
import SiteTemplate from '../../components/SiteTemplate';

class CodeListCore extends Component {
  handleAddClick = () => { browserHistory.push('/code/create'); }

  componentDidMount = () => {
    this.props.loadAllCodes();
  }

  render() {
    return (
      <SiteTemplate
        element={
          <div className="CodeList">
            CodeList
          </div>
        }
      />
    );
  }
}

CodeListCore.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCodes: () => dispatch(fetchCodes()),
  };
};

const CodeList = connect(mapStateToProps, mapDispatchToProps)(CodeListCore);
export default CodeList;
