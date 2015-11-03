import React, { Component } from 'react';

export default class Navbar extends Component {


  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">Tuts-Wanted</a>
          </div>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <button type="button" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span className="caret"></span></button>
                <ul className="dropdown-menu">
                </ul>
              </li>
            </ul>
        </div>
      </nav>
    );
  }


}
