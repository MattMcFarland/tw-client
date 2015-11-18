import React from 'react';
import ReactDOM from 'react-dom';
import {Common} from './components';
import {TutReqView} from './components';

require('./utils/polyfills');

ReactDOM.render(
  <div>
    <header>
      <Common.Navbar />
    </header>
    <div className="container-fluid">
      <TutReqView/>
    </div>
  </div>
  , document.getElementById('requestview'));
