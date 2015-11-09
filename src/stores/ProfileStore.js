import alt from '../alt';
import ProfileActions from '../actions/ProfileActions.js';
import UserStore from './UserStore';
import _ from 'lodash';

class ProfileStore {

  constructor () {
    this.bindActions(ProfileActions);
    this.ready = false;
  }


  onInit () {
    this.waitFor(UserStore);
    let user = UserStore.getState();
    if (!Array.isArray(user.customData.links)) {
      user.customData.links = [];
      user.customData.links.push({name: '', url: ''});
    }
    this.setState({
      ready: true,
      bio: user.customData.bio,
      links: user.customData.links,
      location: user.customData.location,
      occupation: user.customData.occupation
    });
  }

  onUpdateProfileInfoSuccess({bio, links, location, occupation}) {
    this.setState({bio, links, location, occupation});
  }

  onUpdateProfileInfoFail({data}) {
    this.setState(data);
  }

}


export default alt.createStore(ProfileStore, 'ProfileStore');