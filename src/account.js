import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent } from './components/Common/index.js';
import {Account} from './components';

require('./utils/polyfills');

ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <Account/>
    </MainContent>
  </div>
  , document.getElementById('account'));
