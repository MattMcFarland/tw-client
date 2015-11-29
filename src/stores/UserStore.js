import alt from '../alt';
import UserActions from '../actions/UserActions.js';
import _get from 'lodash.get';

class UserStore {

  constructor () {
    this.bindActions(UserActions);
    this.customData = {
      history: []
    }
  }

  onInitSuccess(user) {
    var history = _get('user.customData.history');

    if (history && Array.isArray(history)) {
      user.customData.history.sort((a, b) => {
        return b.timestamp > a.timestamp ? 1 : -1;
      })
    }

    this.setState(user);
  }

  // user is not logged in.
  onInitFail(er) {
    this.setState({error: 'not logged in'});
  }


}


export default alt.createStore(UserStore, 'UserStore');
