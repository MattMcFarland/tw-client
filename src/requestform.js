import React from 'react';
import ReactDOM from 'react-dom';
import {Common} from './components';
import {TutReqForm} from './components';
require('./styles/main.less');

ReactDOM.render(
  <div>
    <header>
      <Common.Navbar/>
    </header>
    <div className="container-fluid">
      <TutReqForm/>
    </div>
  </div>
  , document.getElementById('requestform'));
