import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import './SiteTemplate.css';

class SiteTemplate extends Component {
  render() {
    return (
        <div className="SiteTemplate">
          <Header />
          <main>
            {this.props.element}
          </main>
        </div>
    );
  }
}

export default SiteTemplate;
