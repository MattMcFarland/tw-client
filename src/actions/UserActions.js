import alt from '../alt';
import ajax from 'superagent';

class UserActions {
  constructor() {
    this.generateActions(
      'initFail',
      'initSuccess',
      'updateAccountInfoFail',
      'updateAccountInfoSuccess'
    );

  }

  /**
   * Grabs user from preloaded JSON
   * @param domId {string} domID that has the JSON [default: 'user']
   */
  init(domId) {
    domId || (domId = 'user');
    //console.debug('initializing useractions');
    try {
      this.actions.initSuccess(JSON.parse(document.getElementById(domId).innerText));
    } catch(er) {
      this.actions.initFail(er);
    }
  }

  updateAccountInfo({formFirstName, formLastName, formEmail}) {
    // result handler function (done) will execute the appropriate action in the store.
    const done = ((err, res) => {
      if (err) {
        this.actions.updateAccountInfoFail({formFirstName, formLastName, formEmail, data: {error: res}});
      } else {
        this.actions.updateAccountInfoSuccess({formFirstName, formLastName, formEmail, data: res.body});
      }
    });

    ajax.post('/api/account')
      .send({givenName: formFirstName, surname: formLastName, email: formEmail})
      .end(done)

  }

}

export default alt.createActions(UserActions);
