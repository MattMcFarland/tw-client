import alt from '../alt';
import ajax from 'superagent';
import _ from 'lodash';

class ProfileActions {
  constructor() {
    this.generateActions(
      'setTab',
      'updateProfileInfoFail',
      'updateProfileInfoSuccess',
      'init'
    );
  }

  updateProfileInfo({bio, links, location, occupation, customProps}) {
    _.remove(links, (link) => {
      return (!link.name && !link.url);
    });
    // result handler function (done) will execute the appropriate action in the store.
    const done = ((err, res) => {
      if (err) {
        this.actions.updateProfileInfoFail({data: {error: res}});
      } else {
        this.actions.updateProfileInfoSuccess({bio, links, location, occupation, data: res.body});
      }
    });
    ajax.post('/api/profile')
      .send({bio, links, location, occupation})
      .end(done)
  }


}

export default alt.createActions(ProfileActions);
