import React from 'react';
import ReactDOM from 'react-dom';
import {Common} from './components';
import {TutReqList} from './components';
require('./styles/main.less');

ReactDOM.render(
  <div>
    <header>
      <Common.Navbar/>
      <div className="well">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia lorem ut elit rutrum, et facilisis lectus gravida. Quisque laoreet ante et metus pulvinar gravida. Sed ac metus quis arcu dignissim viverra sit amet in turpis. Mauris sed neque mollis dui dictum sollicitudin.</p>
        <a href="/tutorial-request" className="btn btn-success btn-lg">Request Tutorial</a>
      </div>
    </header>
    <main>
      <TutReqList/>
    </main>
  </div>
  , document.getElementById('index'));
