import React, { Component } from 'react';
import Categorybar from './Categorybar.js';
import Sidebar from './Sidebar.js';

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Categorybar/>
        <Sidebar/>
      </div>
    )
  }
}

export default Layout;
