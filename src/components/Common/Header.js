import React, { Component } from 'react';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import connectStores from 'alt/utils/connectToStores';
import DropDown from './DropDown';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.handlers);
    UserStore.listen(this.onChange);
    UserActions.init();
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render () {
    return (
      <header className="header" role="banner">
        <div className="content cf">
          <a href="/"><img src="/img/wt-logo-alpha.png" className="logo" alt="Logo Alt Text" /></a>
          <nav id="nav" className="nav">
            <ul className="nav-list">
              <li>
                {this.state && this.state.username ? <DropDown title="Account" options={[
                  {
                    type: "link",
                    href: "/account",
                    icon: "user",
                    title: "My Account"
                  },
                  {
                    type: "link",
                    href: "/logout",
                    icon: "log-out",
                    title: "Logout"
                  }
                  ]} /> :
                <a href="/login">Login</a>
              }</li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
