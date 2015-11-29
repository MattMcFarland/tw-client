import alt from '../alt';
import IndexActions from '../actions/IndexActions';
import UserStore from './UserStore';
import UserActions from '../actions/UserActions';
import findIndex from 'lodash.findindex';

/**
 * Determines correct target by collection or parent collection
 * @param state {object}
 * @param state.collection  {string} "comments" or "solutions" - as colletions of root tutorialrequest object.
 * @param state.id          {string} The Comment/TutorialRequest/TutorialSolution ID
 * @param state.parent      {object} parent object
 *    @param state.parent.id         {string} parent id
 *    @param state.parent.type       {string} parent tyoe
 *    @param state.parent.collection {string} parent collection
 * @param store       {object} store
 */

function getTarget(state, store) {
  var {collection, id, parent} = state,
    result;

  if (parent) {
    // get correct parent object.
    let parentIndex = findIndex(store[parent.collection], {id: parent.id});
    let targetIndex = findIndex(store[parent.collection][parentIndex][collection], {id});
    result = store[parent.collection][parentIndex][collection][targetIndex];
  } else if (collection) {
    let targetIndex = findIndex(store[collection], {id});
    result = store[collection][targetIndex];
  } else if (id) {
    result = store;
  } else {
    console.error('invalid object passed to store.')
  }
  if (result) {
    result.lockVote = result.lockVote || true;
    return result;
  }
}


class IndexStore {
  constructor() {
    this.bindActions(IndexActions);
    this.reqList = [];
    this.page = 1;
    this.isLoading = true;
    this.activeTab = localStorage.activeTab || "latest";
  }

  onInitSuccess () {
    this.waitFor(UserStore);
    this.user = UserStore.getState();
  };


  onFetchPending () {
    this.activeTab = localStorage.activeTab;
    this.isLoading = true;
  }

  onFetchSuccess (data) {
    this.activeTab = localStorage.activeTab
    this.isLoading = false;
    this.lastPage = (data.length < 10);
    this.reqList = data;
  }

  onNextPagePending () {
    this.isLoadingNextPage = true;
  }
  onNextPageSuccess (data) {
    this.lastPage = (data.length < 10);
    this.page ++;
    this.isLoadingNextPage = false;
    this.reqList = [].concat(this.reqList, data);
  }


  onFetchFail (err) {
    this.isLoading = false;
    this.errorMessage = err;
  }

  onNextPageFail (err) {
    this.isLoadingNextPage = false;
    this.errorMessage = err;
  }


  onVotePending ({collection, parent, id, direction}) {
    var target = getTarget({collection, parent, id}, this);
    if (this.user.error) {
      return;
    }
    // if previous vote was up
    if (this.user && target.userVote === 1) {
      if (direction === "up") {
        target.userVote = 0;
        target.score -= 1;
      }
      if (direction === "down") {
        target.userVote = -1;
        target.score -= 2;
      }
      // if previous vot was down
    } else if (this.user && target.userVote === -1) {
      if (direction === "up") {
        target.userVote = 1;
        target.score += 2;
      }
      if (direction === "down") {
        target.userVote = 0;
        target.score += 1;
      }
    } else if (this.user && target.userVote === 0) {
      if (direction === "up") {
        target.userVote = 1;
        target.score += 1;
      }
      if (direction === "down") {
        target.userVote = -1;
        target.score -= 1;
      }
    }
    target.lockVote = true;
    this.setState(this);
  }
  onVoteSuccess ({collection, parent, id, data}) {
    var target = getTarget({collection, parent, id}, this);
    target.lockVote = false;
    target.score = data.score;
    target.userVote = data.userVote;
    //this.setState(this);
  }
  onVoteFail ({collection, parent, id, data}) {
    if (data.error && data.error.status === 403) {
      window.location.href =  window.location = "/login?next=" + window.location.pathname;
    }
    let target = getTarget({collection, parent, id}, this);
    target.lockVote = false;
    this.setState(this);
  }

}


export default alt.createStore(IndexStore, 'IndexStore');
