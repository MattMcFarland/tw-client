import alt from '../alt';
import AccountActions from '../actions/AccountActions.js';
import HeadStore from './HeadStore';


class AccountStore {

  constructor () {
    this.bindActions(AccountActions);
    this.activeTab = "account";
  }

  setTab(tabName) {
    this.setState({activeTab: tabName});
  }

  onInit () {
    this.waitFor(HeadStore);
    let user = HeadStore.getState();
    this.setState({
      formFirstName: user.givenName,
      formLastName: user.surname,
      formEmail: user.email,
      user
    });
  }

  onUpdateAccountInfoSuccess({formFirstName, formLastName, formEmail}) {
    this.setState({formFirstName, formLastName, formEmail});
  }

  onUpdateAccountInfoFail({data}) {
    this.setState(data);
  }

}


export default alt.createStore(AccountStore, 'AccountStore');
