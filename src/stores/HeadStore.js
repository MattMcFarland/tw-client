import alt from '../alt';
import HeadActions from '../actions/HeadActions.js';
import _ from 'lodash';

class HeadStore {

  constructor () {
    this.bindActions(HeadActions);
    this.customData = {
      history: []
    }
  }

  onInitSuccess(user) {
    if (user.customData && user.customData.history && Array.isArray(user.customData.history)) {
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


export default alt.createStore(HeadStore, 'HeadStore');
