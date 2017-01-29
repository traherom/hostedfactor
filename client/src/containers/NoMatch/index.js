import React, { Component } from 'react';

import SiteTemplate from '../../components/SiteTemplate';

class NoMatch extends Component {
  render() {
    return (
      <SiteTemplate
        element='404, sorry.'
      />
    );
  }
}

export default NoMatch;
