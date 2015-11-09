import alt from '../alt';
import AccountActions from '../actions/AccountActions.js';
import UserStore from './UserStore';
import _ from 'lodash';

class AccountStore {

  constructor () {
    this.bindActions(AccountActions);
    this.activeTab = "account";
  }

  setTab(tabName) {
    this.setState({activeTab: tabName});
  }

  onInit () {
    this.waitFor(UserStore);
    let user = UserStore.getState();
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
