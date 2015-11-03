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
    this.setState(data);
    this.setState({ready: true});
  }

  onVotePending () {
    this.setState({lockVote: true});
  }

  onVoteSuccess (data) {
    this.setState({
      lockVote: false,
      score: data.score,
      userVote: data.userVote
    });
  }

  onVoteFail (data) {
    this.setState({lockVote: false});
  }

  onVoteCommentSuccess ({commentId, data}) {
    var index = _.findIndex(this.comments, {'id': commentId});
    this.comments[index].userVote = data.userVote;
    this.comments[index].score = data.score;
    this.comments[index].lockVote = false;
    this.setState({comments: this.comments});
  }

  onVoteCommentPending ({commentId}) {
    var index = _.findIndex(this.comments, {'id': commentId});
    this.comments[index].lockVote = true;
    this.setState({comments: this.comments});
  }

  onVoteCommentFail ({commentId, data}) {
  }

  onShowCommentForm () {
    this.volatile.isAddCommentFormExpanded = true;
    this.setState({volatile: this.volatile});
  }

  onCommentSubmitPending({id, type}) {
    if (type === "TutorialRequest") {
      this.volatile.isAddingComment = true;
      this.volatile.isAddCommentFormExpanded = false;
      this.setState({volatile: this.volatile});
    } else {
      let index = _.findIndex(this.solutions, {id});
      this.solutions[index].volatile.isAddCommentFormExpanded = true;
      this.solutions[index].volatile.isAddingComment = true;
      this.setState({solutions: this.solutions});
    }
  }

  onCommentSubmitSuccess({id, type, data}) {
    if (type === "TutorialRequest") {
      this.comments.push(data)
      this.volatile.isAddingComment = false;
      this.setState({
        volatile: this.volatile,
        comments: this.comments
      });
    } else {
      let index = _.findIndex(this.solutions, {id});
      this.solutions[index].volatile.isAddingComment = false;
      this.solutions[index].comments.push(data);
      this.setState({
        solutions: this.solutions
      });
    }
  }

  onCommentSubmitFail({id, type, value}) {
    console.error('comment fail');
  }

}


export default alt.createStore(TutReqStore, 'TutReqStore');
