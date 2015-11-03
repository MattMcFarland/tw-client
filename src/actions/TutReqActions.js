import alt from '../alt';
import ajax from 'superagent';


class TutReqActions {
  constructor() {
    this.generateActions(
      'initSuccess',
      'voteFail',
      'voteSuccess',
      'votePending',
      'voteCommentFail',
      'voteCommentSuccess',
      'voteCommentPending',
      'showCommentForm',
      'commentSubmitFail',
      'commentSubmitSuccess',
      'commentSubmitPending'
    );
  }

  init () {
    var json = JSON.parse(document.getElementById('json').innerText);
    this.actions.initSuccess(json);
  }

  vote (id, direction) {

    const done = ((err, res) => {
      if (err) {
        this.actions.voteFail(err);
      } else {
        this.actions.voteSuccess(res.body);
      }
    });


    ajax.put('/api/tutorial-requests/' + id + '/vote')
      .send({direction})
      .end(done)

    this.actions.votePending();
  }

  voteComment (commentId) {
    const done = ((err, res) => {
      if (err) {
        this.actions.voteCommentFail({commentId, data:err});
      } else {
        this.actions.voteCommentSuccess({commentId, data:res.body});
      }
    });

    ajax.put('/api/comments/' + commentId + '/vote')
      .send({direction: "up"})
      .end(done)

    this.actions.voteCommentPending({commentId});
  }

  addComment ({id, type, value}) {
    var pathPrefix = (type === "TutorialRequest") ? "/api/tutorial-requests/" : "/api/tutorial-solutions/";

    const done = ((err, res) => {
      if (err) {
        this.actions.commentSubmitFail({id, type, data: err});
      } else {
        this.actions.commentSubmitSuccess({id, type, data: res.body});
      }
    });

    ajax.put(pathPrefix + id + '/comment')
      .send({message: value})
      .end(done)

    this.actions.commentSubmitPending({id, type});
  }
}

export default alt.createActions(TutReqActions);
