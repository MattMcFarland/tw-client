import alt from '../alt';
import UserActions from '../actions/UserActions.js';
import _ from 'lodash';

class UserStore {

  constructor () {
    this.bindActions(UserActions);
  }


  onInitSuccess(user) {
    //console.debug('userstore init', user);
    this.setState(user);
  }

  // user is not logged in.
  onInitFail(er) {
    //console.debug('error ocurred', er);
    //this.setState();
  }
}


export default alt.createStore(UserStore, 'UserStore');
