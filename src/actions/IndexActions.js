import alt from '../alt';
import ajax from 'superagent';

class IndexActions {
  constructor() {
    this.generateActions(
      'fetchLatestSuccess',
      'fetchLatestFail',
      'fetchMostWantedSuccess',
      'fetchMostWantedFail',
      'fetchBestTutsSuccess',
      'fetchBestTutsFail',
      'filterBy'
    );
  }
  fetchLatest () {
    ajax.get('/api/tutorial-requests').end((err, res) => {
      if (err) {
        this.actions.fetchLatestFail(err);
      } else {
        this.actions.fetchLatestSuccess(res.body);
      }
    })
  }
}

export default alt.createActions(IndexActions);
