import alt from '../alt';
import IndexActions from '../actions/IndexActions';

class IndexStore {
  constructor() {
    this.bindActions(IndexActions);
    this.reqList = [];
    this.isLoading = true;
    this.activeTab = localStorage.activeTab || "latest";
  }



  onFilterBy (filterType) {
    localStorage.activeTab = filterType;
    this.activeTab = filterType;
  }

  onInitialFetch () {
    this.isLoading = true;
  }
  onInitialFetchSuccess (data) {
    this.isLoading = false;
    this.reqList = data;
  }

  onInitialFetchFail (err) {
    this.isLoading = false;
    this.errorMessage = err;
  }

  onInitialFetchMostWantedSuccess (data) {
    this.reqList = data;
  }

  onInitialFetchMostWantedFail (err) {
    this.errorMessage = err;
  }

  onInitialFetchBestTutsSuccess (data) {
    this.reqList = data;
  }

  onInitialFetchBestTutsFail (err) {
    this.errorMessage = err;
  }

}

export default alt.createStore(IndexStore, 'IndexStore');
