import alt from '../alt';
import IndexActions from '../actions/IndexActions';

class IndexStore {
  constructor() {
    this.bindActions(IndexActions);
    this.reqList = [];
    this.isLoading = true;
    this.activeTab = "latest";
  }



  onFilterBy (filterBy) {
    this.activeTab = filterBy;
  }

  onFetchLatest () {
    this.isLoading = true;
  }
  onFetchLatestSuccess (data) {
    this.isLoading = false;
    this.reqList = data;
  }

  onFetchLatestFail (err) {
    this.isLoading = false;
    this.errorMessage = err;
  }

  onFetchMostWantedSuccess (data) {
    this.reqList = data;
  }

  onFetchMostWantedFail (err) {
    this.errorMessage = err;
  }

  onFetchBestTutsSuccess (data) {
    this.reqList = data;
  }

  onFetchBestTutsFail (err) {
    this.errorMessage = err;
  }

}

export default alt.createStore(IndexStore, 'IndexStore');
