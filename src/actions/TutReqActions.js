import alt from '../alt';
import ajax from 'superagent';


function getPathPrefixByType(type) {
  return (type === "TutorialRequest") ?
    "/api/tutorial-requests/" :
    (type === "Comment") ?
      "/api/comments/" :
      "/api/tutorial-solutions/";
}


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
      'commentSubmitPending',
      'toggleCommentEdit',
      'commentSavePending',
      'commentSaveSuccess',
      'commentSaveFail',
      'deleteSuccess',
      'deleteFail'
    );
  }

  init () {
    var json = JSON.parse(document.getElementById('json').innerText);
    this.actions.initSuccess(json);
  }

  toggleEdit ({type, id}) {
    if (type === "Comment") {
      this.actions.toggleCommentEdit(id);
    }
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

  toggleFlag({type, id, flagType}) {
    var pathPrefix = getPathPrefixByType(type);

    const done = ((err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log('flag success');
      }
    });


    ajax.put(pathPrefix + id + '/flag')
      .send({flagType})
      .end(done)

  }

  // TODO: Add Validation to comment form.
  addComment ({id, type, value}) {
    var pathPrefix = getPathPrefixByType(type);

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

  saveComment ({id, message}) {
    console.debug('save comment', id, 'with message', message);
    const done = ((err, res) => {
      if (err) {
        this.actions.commentSaveFail({id, data: err});
      } else {
        this.actions.commentSaveSuccess({id, data: res.body});
      }
    });

    ajax.put('/api/comments/' + id)
      .send({message})
      .end(done)

    this.actions.commentSavePending({id});

  }

  deleteItem ({id, type}) {
    var pathPrefix = getPathPrefixByType(type);

    const done = ((err, res) => {
      if (err) {
        this.actions.deleteFail({id, type, data: err});
      } else {
        this.actions.deleteSuccess({id, type, data: res.body});
      }
    });

    ajax.del(pathPrefix + id)
      .end(done)

  }
}

export default alt.createActions(TutReqActions);
