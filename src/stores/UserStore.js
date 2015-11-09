import alt from '../alt';
import UserActions from '../actions/UserActions.js';
import _ from 'lodash';

class UserStore {

  constructor () {
    this.bindActions(UserActions);
    this.customData = {
      history: []
    }
  }


  onInitSuccess(user) {
    //console.debug('userstore init', user);
    user.formFirstName = user.givenName;
    user.formLastName = user.surname;
    user.formEmail = user.email;

    if (user.customData && user.customData.history) {
      user.customData.history.sort((a, b) => {
        return b.timestamp > a.timestamp ? 1 : -1;
      })
    }

    this.setState(user);
  }

  // user is not logged in.
  onInitFail(er) {
    console.error(er);

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
