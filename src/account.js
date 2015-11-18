import React from 'react';
import ReactDOM from 'react-dom';
import {Common} from './components';
import {Account} from './components';

require('./utils/polyfills');

ReactDOM.render(
  <div>
    <header>
      <Common.Navbar/>
    </header>
    <div className="container-fluid">
      <Account/>
    </div>
  </div>
  , document.getElementById('account'));
