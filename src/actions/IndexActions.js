import alt from '../alt';
import ajax from 'superagent';

class IndexActions {
  constructor() {
    this.generateActions(
      'initSuccess',

      'fetchPending',
      'fetchSuccess',
      'fetchFail',
      'nextPageSuccess',
      'nextPageFail',
      'nextPagePending',

      'votePending',
      'voteSuccess',
      'voteFail'

    )
  }

  init () {
    this.actions.initSuccess();
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


    this.actions.nextPagePending();


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

  /**
   * Vote Action
   * @param type        {string} "Comment", "TutorialRequest", or "TutorialSolution" - Available from model itself
   * @param collection  {string} "comments" or "solutions" - as colletions of root tutorialrequest object.
   * @param id          {string} The Comment/TutorialRequest/TutorialSolution ID
   * @param parent      {object} parent object
   *    @param parent.id         {string} parent id
   *    @param parent.type       {string} parent tyoe
   *    @param parent.collection {string} parent collection
   * @param direction   {string} Vote direction, "up", or "down"
   */
  vote ({type, collection, id, direction, parent}) {
    // pathPrefix generates the correct API path to apply a vote.

    var pathPrefix = '/api/tutorial-requests/';

    // result handler function (done) will execute the appropriate action in the store.
    const done = ((err, res) => {
      if (err) {
        this.actions.voteFail({id, collection, parent, data: {error: res}});
      } else {
        this.actions.voteSuccess({id, collection, parent, data: res.body});
      }
    });

    // hit API with PUT request.
    ajax.put(pathPrefix + id +  '/vote')
      .send({
        rootUrl: window.location.pathname,
        direction
      })
      .end(done)


    // Inform store that vote is pending
    this.actions.votePending({id, direction, parent, collection});
  }

}

export default alt.createActions(IndexActions);
