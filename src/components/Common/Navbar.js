import React, { Component } from 'react';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import connectStores from 'alt/utils/connectToStores';
import DropDown from './DropDown';


class Navbar extends Component {
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
  loremOption() {
    console.log('loremOption clicked');
  }
  ipsumOption() {
    console.log('ipsum clicked');
  }
  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">Tuts-Wanted</a>
          </div>
            <ul className="nav navbar-nav navbar-right">
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
                }
              </li>
            </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
