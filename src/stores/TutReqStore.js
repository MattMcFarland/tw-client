import alt from '../alt';
import TutReqActions from '../actions/TutReqActions.js';
import _ from 'lodash';

class TutReqStore {
  constructor() {
    this.bindActions(TutReqActions);
    this.ready = false;
    this.volatile = {
      isAddCommentFormExpanded: false,
      currentAddCommentValue: '',
      isDeleted: false,
      isEditingContent: false,
      isEditingLinkMeta: false,
      userCanEdit: false,
      userCanDelete: false,
      userCanSeeDeleted: false
    }
  }

  onInitSuccess (data) {
    this.userFlags = data.userFlags;
    this.setState(data);
    console.debug('Store Initialized:', data);
    this.setState({ready: true});
  }

  onVotePending ({collection, id}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      updateObj = collection ? this[collection][index] : this;

    updateObj.volatile || (updateObj.volatile = {});
    updateObj.volatile.lockVote = true;
    this.setState(this);
  }
  onVoteSuccess ({collection, id, data}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      updateObj = collection ? this[collection][index] : this;

    updateObj.volatile || (updateObj.volatile = {});
    updateObj.volatile.lockVote = false;
    updateObj.score = data.score;
    updateObj.userVote = data.userVote;
    this.setState(this);
  }
  onVoteFail ({collection, id}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      updateObj = collection ? this[collection][index] : this;

    updateObj.volatile || (updateObj.volatile = {});
    updateObj.volatile.lockVote = false;
    this.setState(this);
  }

  onShowCommentForm ({collection, id}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      updateObj = collection ? this[collection][index] : this;

    updateObj.volatile || (updateObj.volatile = {});
    updateObj.volatile.isAddCommentFormExpanded = true;
    this.setState(this);
  }
  onCommentSubmitPending ({collection, id}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      updateObj = collection ? this[collection][index] : this;

    updateObj.volatile || (updateObj.volatile = {});
    updateObj.volatile.isAddingComment = true;
    updateObj.volatile.isAddCommentFormExpanded = false;
    this.setState(this);
  }
  onCommentSubmitSuccess ({collection, id, data}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      updateObj = collection ? this[collection][index] : this;

    updateObj.volatile || (updateObj.volatile = {});
    updateObj.volatile.isAddingComment = false;
    updateObj.comments.push(data);
    this.setState(this);
  }
  onCommentSubmitFail ({collection, id, data}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      target = collection ? this[collection][index] : this,
      update = {
        volatile: {
          isAddingComment: false,
        }
      }
    Object.assign(target, update);
  }

  onToggleItemEdit ({collection, id}) {

    var index = collection ? _.findIndex(this[collection], {id}) : false;
    if (collection) {
      this[collection][index].volatile || (this[collection][index].volatile = {});
      this[collection][index].volatile.isEditing = !this[collection][index].volatile.isEditing;
    } else {
      this.volatile.isEditing = !this.volatile.isEditing
    }
    this.setState(this);
  }

  onUpdateItemPending ({collection, id}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      target = collection ? this[collection][index] : this,
      update = {
        volatile: {
          isEditing: false,
          editLocked: true
        }
      }
    Object.assign(target, update);
  }

  onUpdateItemSuccess ({items, item, collection, id, data}) {

    var index = collection ? _.findIndex(this[collection], {id}) : false,
      target = collection ? this[collection][index] : this,
      update = {
        volatile: {
          isEditing: false,
          editLocked: false
        }
      }
    Object.assign(target, update);
    if (collection) {
      if (item) {
        this[collection][index][item] = data[item];
      } else if (items) {
        items.forEach((updateItem) => {
          this[collection][index][updateItem] = data[updateItem];
        })
      } else {
        this[collection][index] = data;
      }
    } else {
      if (item) {
        this[item] = data[item]
      } else if (items) {
        items.forEach((updateItem) => {
          this[updateItem] = data[updateItem];
        })
      } else {
        this.setState(data);
      }
    }
    this.setState(this);
  }
  onUpdateItemFail ({collection, id, data}) {
    var
      index = collection ? _.findIndex(this[collection], {id}) : false,
      target = collection ? this[collection][index] : this,
      update = {
        volatile: {
          isEditing: false,
          editLocked: false
        }
      }
    Object.assign(target, update);
  }

  onDeleteSuccess ({collection, id, type, data}) {
    var index;
    if (type === "TutorialRequest") {
      this.setState({removed: data.removed});
    }

    if (type === "Comment") {
      index = _.findIndex(this.comments, {id});
      this.comments[index].removed = data.removed;
      this.setState({comments: this.comments});
    }

    if (type === "TutorialSolution") {
      index = _.findIndex(this.solutions, {id});
      this.solutions[index].removed = data.removed;
      this.setState({solutions: this.solutions});
    }

  }
}


export default alt.createStore(TutReqStore, 'TutReqStore');
