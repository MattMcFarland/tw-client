import React from 'react';
import ReactDOM from 'react-dom';
import {Common} from './components';
import {TutReqList} from './components';

require('./utils/polyfills');


ReactDOM.render(
  <div>
    <header>
      <Common.Navbar/>
    </header>
    <Common.Layout>
      <TutReqList/>
    </Common.Layout>
  </div>
, document.getElementById('index'));
