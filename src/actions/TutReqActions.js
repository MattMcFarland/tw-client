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

      'votePending',
      'voteSuccess',
      'voteFail',

      'showCommentForm',

      'commentSubmitFail',
      'commentSubmitSuccess',
      'commentSubmitPending',

      'toggleItemEdit',

      'updateItemPending',
      'updateItemSuccess',
      'updateItemFail',

      'deleteSuccess',
      'deleteFail'
    );
  }

  init () {
    var json = JSON.parse(document.getElementById('json').innerText);
    this.actions.initSuccess(json);
  }


  /**
   * Vote Action
   * @param type        {string} "Comment", "TutorialRequest", or "TutorialSolution" - Available from model itself
   * @param collection  {string} "comments" or "solutions" - as colletions of root tutorialrequest object.
   * @param id          {string} The Comment/TutorialRequest/TutorialSolution ID
   * @param direction   {string} Vote direction, "up", or "down"
   */
  vote ({type, collection, id, direction}) {
    // pathPrefix generates the correct API path to apply a vote.
    var pathPrefix = getPathPrefixByType(type);

    // result handler function (done) will execute the appropriate action in the store.
    const done = ((err, res) => {
      if (err) {
        this.actions.voteFail({id, collection, data: err});
      } else {
        this.actions.voteSuccess({id, collection, data: res.body});
      }
    });

    // hit API with PUT request.
    ajax.put(pathPrefix + id +  '/vote')
      .send({direction})
      .end(done)

    // Inform store that vote is pending
    this.actions.votePending({id, collection});
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
  /**
   * Comment Action
   * @param type        {string} "TutorialRequest", or "TutorialSolution" - Available from model itself
   * @param collection  {string} "solutions" or undefined.
   * @param id          {string} The TutorialRequest/TutorialSolution ID
   * @param message     {string} Comment Message
   */
  addComment ({type, collection, id, message}) {
    var pathPrefix = getPathPrefixByType(type);

    const done = ((err, res) => {
      if (err) {
        this.actions.commentSubmitFail({id, collection, data: err});
      } else {
        this.actions.commentSubmitSuccess({id, collection, data: res.body});
      }
    });

    ajax.put(pathPrefix + id + '/comment')
      .send({message})
      .end(done)

    this.actions.commentSubmitPending({id, collection});
  }

  /**
   * Update Item
   * @param type        {string} "Comment", "TutorialRequest", or "TutorialSolution" - Available from model itself
   * @param collection  {string} "solutions" or "comments".
   * @param id          {string} The TutorialRequest/TutorialSolution/Comment ID
   * @param fields      {string} JSON key/value pairs to update db.
   */
  updateItem ({items, item, type, collection, id, fields}) {
    var pathPrefix = getPathPrefixByType(type);

    const done = ((err, res) => {
      if (err) {
        this.actions.updateItemFail({items, id, collection, data: err});
      } else {
        this.actions.updateItemSuccess({items, id, collection, data: res.body});
      }
    });

    ajax.put(pathPrefix + id)
      .send(fields)
      .end(done)

    this.actions.updateItemPending({type, collection, id, fields});
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
