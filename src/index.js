import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar} from './components'
window.React = React;

ReactDOM.render(
  <div>
    <header>
      <Navbar/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia lorem ut elit rutrum, et facilisis lectus gravida. Quisque laoreet ante et metus pulvinar gravida. Sed ac metus quis arcu dignissim viverra sit amet in turpis. Mauris sed neque mollis dui dictum sollicitudin.</p>
        <button class="btn btn-success lg">Request Tutorial</button>
    </header>
    <main>

    </main>
  </div>
  , document.getElementById('index'));
