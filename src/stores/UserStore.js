import alt from '../alt';
import UserActions from '../actions/UserActions.js';
import _ from 'lodash';

class UserStore {

  constructor () {
    this.bindActions(UserActions);
  }


  onInitSuccess(user) {
    //console.debug('userstore init', user);
    user.formFirstName = user.givenName;
    user.formLastName = user.surname;
    user.formEmail = user.email;
    this.setState(user);
  }

  // user is not logged in.
  onInitFail(er) {
    this.setState({error: 'not logged in'});
    //console.debug('error ocurred', er);
    //this.setState();
  }

  onUpdateAccountInfoSuccess({data}) {
    this.setState(data);
  }

  onUpdateAccountInfoFail({data}) {
    this.setState(data);
  }


}


export default alt.createStore(UserStore, 'UserStore');
