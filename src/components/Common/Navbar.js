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
      <header>
        <nav className="topbar">
          <div className="topbar__content">
            <div className="row">
              <div className="col-lg-9 col-lg-offset-2">
                <a href="/" className="topbar__logo">WT</a>
                <ul className="topbar__list pull-right">
                  <li className="topbar__list__item">
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
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
