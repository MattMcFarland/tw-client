import alt from '../alt';
import TutReqActions from '../actions/TutReqActions.js';
import _ from 'lodash';

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
    let parentIndex = _.findIndex(store[parent.collection], {id: parent.id});
    let targetIndex = _.findIndex(store[parent.collection][parentIndex][collection], {id});
    result = store[parent.collection][parentIndex][collection][targetIndex];
  } else if (collection) {
    let targetIndex = _.findIndex(store[collection], {id});
    result = store[collection][targetIndex];
  } else if (id) {
    result = store;
  } else {
    console.error('invalid object passed to store.')
  }
  if (result) {
    result.volatile = result.volatile || {};
    return result;
  }
}

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
    this.solutions = [];
  }

  onInitSuccess (data) {
    this.userFlags = data.userFlags;
    this.setState(data);
    console.debug('Store Initialized:', data);
    this.setState({ready: true});
  }



  onVotePending ({collection, parent, id}) {
    var target = getTarget({collection, parent, id}, this);
    target.lockVote = true;
    this.setState(this);
  }
  onVoteSuccess ({collection, parent, id, data}) {
    var target = getTarget({collection, parent, id}, this);
    target.volatile.lockVote = false;
    target.score = data.score;
    target.userVote = data.userVote;
    this.setState(this);
  }
  onVoteFail ({collection, parent, id}) {
    var target = getTarget({collection, parent, id}, this);
    target.volatile.lockVote = false;
    this.setState(this);
  }

  onShowCommentForm ({collection, parent, id}) {
    var target = getTarget({collection, parent, id}, this);
    target.volatile.isAddCommentFormExpanded = true;
    this.setState(this);
  }

  onCommentSubmitPending ({collection, parent, id}) {
    var target = getTarget({collection, parent, id}, this);
    target.volatile.isAddingComment = true;
    target.volatile.isAddCommentFormExpanded = false;
    this.setState(this);
  }

  onCommentSubmitSuccess ({collection, id, parent, data}) {
    var target = getTarget({collection, parent, id}, this);
    target.volatile.isAddingComment = false;
    target.comments.push(data);
    this.setState(this);
  }

  onCommentSubmitFail ({collection, id, parent, data}) {
    var target = getTarget({collection, parent, id}, this),
      update = {
        volatile: {
          isAddingComment: false
        }
      }
    Object.assign(target, update);
  }

  onToggleItemEdit ({collection, parent, id}) {
    var target = getTarget({collection, parent, id}, this);
    console.log('target.volatile', target.volatile);
    target.volatile.isEditing = !target.volatile.isEditing
    this.setState(this);
  }

  onUpdateItemPending ({collection, parent, id}) {
    var target = getTarget({collection, parent, id}, this),
      update = {
        volatile: {
          isEditing: false,
          editLocked: true
        }
      }
    Object.assign(target, update);
  }

  onUpdateItemSuccess ({items, item, collection, parent, id, data}) {
    var target = getTarget({collection, parent, id}, this),
      update = {
        volatile: {
          isEditing: false,
          editLocked: false
        }
      };
    Object.assign(target, update);
    if (item) {
      target[item] = data[item];
    }
    if (items) {
      items.forEach((updateItem) => {
        target[updateItem] = data[updateItem]
      })
    }
    if (parent && parent.collection === "solutions") {
      console.debug('solutions update ?', this.solutions);
      this.setState({solutions: this.solutions})
    } else {
      this.setState(this);
    }
  }

  onUpdateItemFail ({collection, id, parent, data}) {
    var target = getTarget({collection, parent, id}, this),
      update = {
        volatile: {
          isEditing: false,
          editLocked: false
        }
      }
    Object.assign(target, update);
  }

  onDeleteSuccess ({collection, id, parent, type, data}) {
    var target = getTarget({collection, parent, id}, this);
    target.removed = data.removed;
    this.setState(this);
  }
}


export default alt.createStore(TutReqStore, 'TutReqStore');
