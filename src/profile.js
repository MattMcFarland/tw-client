import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent } from './components/Common/index.js';
import {Profile} from './components';

require('./utils/polyfills');

ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <Profile/>
    </MainContent>
  </div>
  , document.getElementById('profile'));
