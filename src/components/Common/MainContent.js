import React from 'react';
import Tabs from './Tabs';


class MainContent extends React.Component {

  render () {

    return (
      <div className="main-content-container cf">
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainContent;
