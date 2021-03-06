import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiteTemplate from '../../components/SiteTemplate';

class HomeCore extends Component {
  render() {
    return (
      <SiteTemplate
        element={<div>Home</div>}
      />
    );
  }
}

const Home = connect()(HomeCore);
export default Home;
