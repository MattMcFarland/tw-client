import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent, Footer  } from './components/Common/index.js';
import {TutReqForm} from './components';

require('./utils/polyfills');

ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <TutReqForm/>
    </MainContent>
    <Footer />

  </div>
  , document.getElementById('requestform'));
