import React from 'react';
import moment from 'moment';
import classNames from 'classnames'
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.handlers);
    UserStore.listen(this.onChange);
    UserActions.init('json');
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render () {
    return (
      <div>
        <h3>{this.state.fullName}</h3>
        <p>This is a basic user profile page...</p>
      </div>
    );
  }

};
