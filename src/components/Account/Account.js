import React from 'react';
import moment from 'moment';
import classNames from 'classnames'
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

export default class Account extends React.Component {

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

  onSubmit(e) {
    e.preventDefault();
  }

  render () {
    return (
      <div>
        <h2>My Account </h2>
        <p>Edit the form below to change your info</p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <fieldset className="form-group">

              <label htmlFor="firstName" className="form-label">First Name</label>
              <input id="firstName" type="text" className="form-control" name="firstName" value={this.state.givenName}/>

          </fieldset>
          <fieldset className="form-group">

              <label htmlFor="surname" className="form-label">Last Name</label>
              <input id="surname" type="text" className="form-control" name="surname" value={this.state.surname}/>

          </fieldset>
          <fieldset className="form-group">

              <label htmlFor="email" className="form-label">Email Address</label>
              <input id="email" type="email" className="form-control" name="email" value={this.state.email}/>

          </fieldset>

          <input className="btn btn-info" type="submit" value="Save Changes"/>
        </form>
      </div>
    );
  }

};
