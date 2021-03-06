import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent, Footer } from './components/Common/index.js';
import { TutReqList } from './components/index.js';

require('./utils/polyfills');


ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <TutReqList />
    </MainContent>
    <Footer />
  </div>
, document.getElementById('index'));
