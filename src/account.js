import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent, Footer  } from './components/Common/index.js';
import {Account} from './components';

require('./utils/polyfills');

ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <Account/>
    </MainContent>
    <Footer />

  </div>
  , document.getElementById('account'));
