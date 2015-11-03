import React from 'react';
import ReactDOM from 'react-dom';
import {Common} from './components';
import {TutReqView} from './components';
require('./styles/main.less');

ReactDOM.render(
  <div>
    <header>
      <Common.Navbar/>
    </header>
    <main className="container">
      <TutReqView/>
    </main>
  </div>
  , document.getElementById('requestview'));
