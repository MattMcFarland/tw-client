import alt from '../alt';

class UserActions {
  constructor() {
    this.generateActions(
      'initFail',
      'initSuccess'
    );

  }

  init() {
    console.debug('initializing useractions');
    try {
      this.actions.initSuccess(JSON.parse(document.getElementById('user').innerText));
    } catch(er) {
      this.actions.initFail(er);
    }
  }

}

export default alt.createActions(UserActions);
