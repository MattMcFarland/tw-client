import React from 'react';

class Header extends React.Component {
  render () {
    return (
      <header className="header" role="banner">
        <div className="content cf">
          <a href="/"><img src="/img/wt-logo-alpha.png" className="logo" alt="Logo Alt Text" /></a>
          <nav id="nav" className="nav">
            <ul className="nav-list">
              <li><a href="#">Account</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
