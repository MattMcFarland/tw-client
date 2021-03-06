import alt from '../alt';
import TutReqActions from '../actions/TutReqActions.js';
import findIndex from 'lodash.findindex';
import UserStore from './UserStore';
import UserActions from '../actions/UserActions';
import scrollTo from '../utils/scrollTo';

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
      userCanSeeDeleted: false,
      solutionPending: false
    }
    this.solutions = [];
  }


  onInitSuccess (data) {
    this.waitFor(UserStore);

    this.user = UserStore.getState();

    if (data.solutions && Array.isArray(data.solutions)) {

      data.solutions = data.solutions.sort( (a, b) => {
        return a.score > b.score ? -1 : 1;
      });

    }

    this.userFlags = data.userFlags;
    this.setState(data);
    //console.debug('Store Initialized:', data);
    this.setState({ready: true});

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
    target.volatile.lockVote = true;
    this.setState(this);
  }
  onVoteSuccess ({collection, parent, id, data}) {
    var target = getTarget({collection, parent, id}, this);
    target.volatile.lockVote = false;
    target.score = data.score;
    target.userVote = data.userVote;
    this.setState(this);
  }
  onVoteFail ({collection, parent, id, data}) {
    if (data.error && data.error.status === 403) {
      window.location.href =  window.location = "/login?next=" + window.location.pathname;
    }
    let target = getTarget({collection, parent, id}, this);
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
    //console.log('target.volatile', target.volatile);
    target.volatile.isEditing = !target.volatile.isEditing
    this.setState(this);
  }
  onToggleTagsEdit ({collection, parent, id}) {
    var target = getTarget({collection, parent, id}, this);
    //console.log('target.volatile', target.volatile);
    target.volatile.isEditingTags = !target.volatile.isEditingTags
    this.setState(this);
  }
  onUpdateItemPending ({items, item, collection, parent, id, data}) {
    var target = getTarget({collection, parent, id}, this),
      update = {
        volatile: {
          isEditing: false,
          editLocked: true,
          isSaving: true
        }
      };
    Object.assign(target, update);
    if (item) {
      target[item] = data[item];
    }
    if (items) {
      items.forEach((updateItem) => {
        target[updateItem] = data[updateItem];
      })
    }
    this.updated = target;
    if (parent && parent.collection === "solutions") {
      //console.debug('solutions update ?', this.solutions);
      this.setState({solutions: this.solutions})
    } else {
      this.setState(this);
    }

  }
  onUpdateItemSuccess ({items, item, collection, parent, id, data}) {
    var target = getTarget({collection, parent, id}, this),
      update = {
        volatile: {
          isEditing: false,
          editLocked: false,
          isSaving: false
        }
      };
    Object.assign(target, update);
    if (item) {
      target[item] = data[item];
    }
    if (items) {
      items.forEach((updateItem) => {
        target[updateItem] = data[updateItem];
      })
    }
    this.updated = target;
    if (parent && parent.collection === "solutions") {
      //console.debug('solutions update ?', this.solutions);
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
  onJudgeTagPending ({id, decision}) {
    var target = getTarget({collection: 'tags', id}, this);
    target.is_pending = false;
    target.is_approved = decision === 'approve';
  }
  onJudgeTagSuccess ({id, decision, data}) {
    var target = getTarget({collection: 'tags', id}, this);
    target.is_pending = false;
    target.is_approved = data.is_approved;
  }
  onJudgeTagFail ({id, decision}) {

  }
  onAddSolutionPending () {
    this.volatile.solutionPending = true;
  }
  onAddSolutionFail ({id, data}) {
    this.volatile.solutionPending = false;
  }
  onAddSolutionSuccess ({id, data}) {
    this.solutions.push(data);
    this.volatile.solutionPending = false;
    this.setState(this);
    // there should be a cleaner way to do this:
    setTimeout(() => {
      var newPost = document.getElementById('tutorialsolution-' + data.id);
      if (newPost) {
        scrollTo({target: newPost});
      }
    }, 300)
  }
  onDeleteSuccess ({collection, id, parent, type, data}) {
    var target = getTarget({collection, parent, id}, this);
    target.removed = data.removed;
    this.setState(this);
  }
  onToggleFlagPending () {
    if (this.user.error) {
      window.location.href =  window.location = "/login?next=" + window.location.pathname;
    }
  }
}


export default alt.createStore(TutReqStore, 'TutReqStore');
