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
   * @param parent      {object} parent object
   *    @param parent.id         {string} parent id
   *    @param parent.type       {string} parent tyoe
   *    @param parent.collection {string} parent collection
   * @param direction   {string} Vote direction, "up", or "down"
   */
  vote ({type, collection, id, direction, parent}) {
    // pathPrefix generates the correct API path to apply a vote.
    var pathPrefix = getPathPrefixByType(type);

    // result handler function (done) will execute the appropriate action in the store.
    const done = ((err, res) => {
      if (err) {
        this.actions.voteFail({id, collection, parent, data: err});
      } else {
        this.actions.voteSuccess({id, collection, parent, data: res.body});
      }
    });

    // hit API with PUT request.
    ajax.put(pathPrefix + id +  '/vote')
      .send({direction})
      .end(done)

    // Inform store that vote is pending
    this.actions.votePending({id, parent, collection});
  }

  toggleFlag({type, id, flagType}) {
    var pathPrefix = getPathPrefixByType(type);

    const done = ((err, res) => {
      if (err) {
        console.error(err);
      } else {
        //console.log('flag success');
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
   * @param parent      {object} parent object
   *    @param parent.id         {string} parent id
   *    @param parent.type       {string} parent tyoe
   *    @param parent.collection {string} parent collection
   * @param id          {string} The TutorialRequest/TutorialSolution ID
   * @param message     {string} Comment Message
   */
  addComment ({type, collection, id, parent, message}) {
    var pathPrefix = getPathPrefixByType(type);

    const done = ((err, res) => {
      if (err) {
        this.actions.commentSubmitFail({id, collection, parent, data: err});
      } else {
        this.actions.commentSubmitSuccess({id, collection, parent, data: res.body});
      }
    });

    ajax.put(pathPrefix + id + '/comment')
      .send({message})
      .end(done)

    this.actions.commentSubmitPending({id, parent, collection});
  }

  /**
   * Update Item
   * @param type        {string} "Comment", "TutorialRequest", or "TutorialSolution" - Available from model itself
   * @param collection  {string} "solutions" or "comments".
   * @param parent      {object} parent object
   *    @param parent.id         {string} parent id
   *    @param parent.type       {string} parent tyoe
   *    @param parent.collection {string} parent collection
   * @param id          {string} The TutorialRequest/TutorialSolution/Comment ID
   * @param fields      {string} JSON key/value pairs to update db.
   * @param items       {array} update items via map from fields
   */
  updateItem ({items, type, collection, id, fields, parent}) {
    var pathPrefix = getPathPrefixByType(type);

    const done = ((err, res) => {
      if (err) {
        this.actions.updateItemFail({items, id, collection, parent, data: err});
      } else {
        this.actions.updateItemSuccess({items, id, collection, parent, data: res.body});
      }
    });

    ajax.put(pathPrefix + id)
      .send(fields)
      .end(done)

    this.actions.updateItemPending({type, collection, id, parent, fields});
  }


  deleteItem ({id, collection, type, parent}) {
    var pathPrefix = getPathPrefixByType(type);
    //console.log('delete type', type)
    const done = ((err, res) => {
      if (err) {
        this.actions.deleteFail({id, type, collection, parent, data: err});
      } else {
        this.actions.deleteSuccess({id, type, collection, parent, data: res.body});
      }
    });

    ajax.del(pathPrefix + id)
      .end(done)

  }
}

export default alt.createActions(TutReqActions);
