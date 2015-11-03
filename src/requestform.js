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
    <main>
      <TutReqForm/>
    </main>
  </div>
  , document.getElementById('requestform'));
