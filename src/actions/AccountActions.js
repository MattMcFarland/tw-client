import alt from '../alt';
import ajax from 'superagent';

class AccountActions {
  constructor() {
    this.generateActions(
      'setTab',
      'updateAccountInfoFail',
      'updateAccountInfoSuccess',
      'init'
    );
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

export default alt.createActions(AccountActions);
