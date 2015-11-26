import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent } from './components/Common/index.js';
import { TutReqView } from './components/index.js';

require('./utils/polyfills');

window.scrollTo = require('./utils/scrollTo');


ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <TutReqView />
  </div>
  , document.getElementById('requestview'));
