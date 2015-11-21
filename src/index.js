import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent } from './components/Common/index.js';
import { TutReqList } from './components/index.js';

require('./utils/polyfills');


ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <TutReqList />
    </MainContent>
  </div>
, document.getElementById('index'));
