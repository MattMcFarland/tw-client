import alt from '../alt';
import ProfileActions from '../actions/ProfileActions.js';
import HeadStore from './HeadStore';


class ProfileStore {

  constructor () {
    this.bindActions(ProfileActions);
    this.ready = false;
  }


  onInit () {
    this.waitFor(HeadStore);
    let user = HeadStore.getState();
    if (!Array.isArray(user.customData.links)) {
      user.customData.links = [];
      user.customData.links.push({name: '', url: ''});
    } else if (!user.customData.links.length) {
      user.customData.links.push({name: '', url: ''});
    }
    this.setState({
      ready: true,
      avatar: user.customData.avatar,
      bio: user.customData.bio,
      links: user.customData.links,
      location: user.customData.location,
      occupation: user.customData.occupation
    });
  }

  onUpdateProfileInfoSuccess({avatar, bio, links, location, occupation}) {
    this.setState({avatar, bio, links, location, occupation});
  }

  onUpdateProfileInfoFail({data}) {
    this.setState(data);
  }

}


export default alt.createStore(ProfileStore, 'ProfileStore');
