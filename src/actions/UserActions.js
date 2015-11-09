import alt from '../alt';

class UserActions {
  constructor() {
    this.generateActions(
      'initFail',
      'initSuccess'
    );

  }

  /**
   * Grabs user from preloaded JSON
   * @param domId {string} domID that has the JSON [default: 'user']
   */
  init(domId) {
    domId || (domId = 'user');
    console.debug('initializing useractions');
    try {
      this.actions.initSuccess(JSON.parse(document.getElementById(domId).innerText));
    } catch(er) {
      this.actions.initFail(er);
    }
  }

}

export default alt.createActions(UserActions);
