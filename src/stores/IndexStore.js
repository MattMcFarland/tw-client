import alt from '../alt';
import IndexActions from '../actions/IndexActions';

class IndexStore {
  constructor() {
    this.bindActions(IndexActions);
    this.reqList = [];
    this.page = 1;
    this.isLoading = true;
    this.activeTab = localStorage.activeTab || "latest";
  }

  onFetchSuccess (data) {
    this.activeTab = localStorage.activeTab
    this.isLoading = false;
    this.lastPage = (data.length < 10);
    this.reqList = data;
  }

  onNextPageSuccess (data) {
    this.lastPage = (data.length < 10);
    this.page ++;
    this.isLoading = false;
    this.reqList = [].concat(this.reqList, data);
  }


  onFetchFail (err) {
    this.isLoading = false;
    this.errorMessage = err;
  }

  onNextPageFail (err) {
    this.isLoading = false;
    this.errorMessage = err;
  }

}


export default alt.createStore(IndexStore, 'IndexStore');
