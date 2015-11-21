import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent } from './components/Common/index.js';
import { TutReqView } from './components/index.js';

require('./utils/polyfills');


ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <TutReqView />
    </MainContent>
  </div>
  , document.getElementById('requestview'));
