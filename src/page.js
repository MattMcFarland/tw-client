import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Layout, MainContent, Footer } from './components/Common/index.js';
import marked from 'marked';

require('./utils/polyfills');

var pageContent = document.getElementById('page-content').innerHTML.toString();

ReactDOM.render(
  <div>
    <Header />
    <Layout />
    <MainContent>
      <div dangerouslySetInnerHTML={{__html: pageContent }} />
    </MainContent>
    <Footer />
  </div>
  , document.getElementById('page'));
