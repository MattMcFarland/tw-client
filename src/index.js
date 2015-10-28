import React from 'react';
import ReactDOM from 'react-dom';
import RequestList from './components/RequestList/RequestList';
import {TutRequestItemCard} from '@mattmcfarland/tuts-wanted-style';
import moment from 'moment';

window.React = React;

ReactDOM.render(
  <div>
    <div route="index">
      <section className="well"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum diam sapien, semper euismod tortor elementum ut. Etiam ultrices, ligula eu lacinia mollis, nibh orci laoreet tortor, vitae aliquet odio orci at libero. Aliquam erat volutpat. Curabitur velit nulla, euismod ut finibus ornare, accumsan nec quam.</p>
        <a href="/tutorial-request" className="btn btn-info btn-large">Request a Tutorial</a>
      </section>
      <RequestList />
      <div/>
    </div>
  </div>
  , document.getElementById('index'));
