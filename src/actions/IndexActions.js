import alt from '../alt';
import ajax from 'superagent';

class IndexActions {
  constructor() {
    this.generateActions(
      'fetchPending',
      'fetchSuccess',
      'fetchFail',
      'nextPageSuccess',
      'nextPageFail'
    )
  }


  fetch (filterBy) {

    const done = ((err, res) => {
      if (err) {
        this.actions.fetchFail(err);
      } else {
        this.actions.fetchSuccess(res.body);
      }
    });

    if (!filterBy && !localStorage.activeTab) {
      filterBy = "latest";
      localStorage.activeTab = filterBy;
    } else if (!filterBy && localStorage.activeTab) {
      filterBy = localStorage.activeTab;
    } else {
      localStorage.activeTab = filterBy;
    }

    switch (filterBy) {
      case "latest":
        ajax.get('/api/tutorial-requests')
          .query({sortBy: "latest"})
          .end(done)
        break;

      case "best":
        ajax.get('/api/tutorial-requests')
          .query({$where: "this.solutions.length > 0"})
          .query({showpositive: true})
          .query({sortBy: "score"})
          .end(done)
        break;

      case "wanted":
        ajax.get('/api/tutorial-requests')
          .query({$where: "this.solutions.length === 0"})
          .query({showpositive: true})
          .query({sortBy: "score"})
          .end(done)
        break;

    }

    this.actions.fetchPending();
  }

  fetchNextPage (page, filter) {
    page ++;

    const done = ((err, res) => {
      if (err) {
        this.actions.nextPageFail(err);
      } else {
        this.actions.nextPageSuccess(res.body);
      }
    });

    switch (filter) {
      case "latest":
        ajax.get('/api/tutorial-requests')
          .query({page})
          .end(done)
        break;

      case "best":
        ajax.get('/api/tutorial-requests')
          .query({page})
          .query({$where: "this.solutions.length > 0"})
          .query({showpositive: true})
          .end(done)
        break;

      case "wanted":
        ajax.get('/api/tutorial-requests')
          .query({page})
          .query({$where: "this.solutions.length === 0"})
          .query({showpositive: true})
          .end(done)
        break;

    }
  }


}

export default alt.createActions(IndexActions);
