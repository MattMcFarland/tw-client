import React, { Component } from 'react';
import Categorybar from './Categorybar.js';
import Sidebar from './Sidebar.js';

class Layout extends Component {
  render() {
    return (
      <main className="section">
        <div className="container-fluid" style={{padding: "0"}}>
          <div className="row">
            <div id="content" className="col-lg-9">
              <Categorybar/>
              {this.props.children}
              <Sidebar/>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Layout;
