import alt from '../alt';
import ajax from 'superagent';

class IndexActions {
  constructor() {
    this.generateActions(
      'initialFetchSuccess',
      'initialFetchFail',
      'fetchLatestSuccess',
      'fetchLatestFail',
      'fetchMostWantedSuccess',
      'fetchMostWantedFail',
      'fetchBestTutsSuccess',
      'fetchBestTutsFail',
      'filterBy'
    );
  }
  initialFetch () {
    ajax.get('/api/tutorial-requests').end((err, res) => {
      if (err) {
        this.actions.initialFetchFail(err);
      } else {
        this.actions.initialFetchSuccess(res.body);
      }
    })
  }
}

export default alt.createActions(IndexActions);
