import alt from '../alt';
import ajax from 'superagent';
import UserActions from './UserActions';

function getPathPrefixByType(type) {
  return (type === "TutorialRequest") ?
    "/api/tutorial-requests/" :
    (type === "Comment") ?
      "/api/comments/" :
      (type === "Tag") ?
        "/api/tags/" :
          "/api/tutorial-solutions/";
}


class TutReqActions {
  constructor() {
    this.generateActions(
      'initSuccess',

      'votePending',
      'voteSuccess',
      'voteFail',

      'judgeTagPending',
      'judgeTagSuccess',
      'judgeTagFail',

      'showCommentForm',

      'commentSubmitFail',
      'commentSubmitSuccess',
      'commentSubmitPending',

      'addSolutionPending',
      'addSolutionSuccess',
      'addSolutionFail',

      'toggleItemEdit',
      'toggleTagsEdit',

      'toggleFlagPending',

      'updateItemPending',
      'updateItemSuccess',
      'updateItemFail',

      'deleteSuccess',
      'deleteFail'
    );
  }

  init () {
    var json = JSON.parse(document.getElementById('json').innerHTML);
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
        this.actions.voteFail({id, collection, parent, data: {error: res}});
      } else {
        this.actions.voteSuccess({id, collection, parent, data: res.body});
      }
    });

    // hit API with PUT request.
    ajax.put(pathPrefix + id +  '/vote')
      .send({
        rootUrl: window.location.pathname,
        direction
      })
      .end(done)


    // Inform store that vote is pending
    this.actions.votePending({id, direction, parent, collection});
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
      .send({
        rootUrl: window.location.pathname,
        flagType
      })
      .end(done)

    this.actions.toggleFlagPending();
  }


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
      .send({
        rootUrl: window.location.pathname,
        message
      })
      .end(done)

    this.actions.commentSubmitPending({id, parent, collection});
  }

  addSolution ({id, formData}) {
    const done = ((err, res) => {
      if (err) {
        this.actions.addSolutionFail({id, data: err});
      } else {
        this.actions.addSolutionSuccess({id, data: res.body});
      }
    });

    ajax.put('/api/tutorial-requests/' + id + '/solution')
      .send({
        formData,
        rootUrl: window.location.pathname
      })
      .end(done);

    this.actions.addSolutionPending({id, formData});

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
      .send({
        formData: fields,
        rootUrl: window.location.pathname
      })
      .end(done)

    this.actions.updateItemPending({items, type, collection, id, parent, data: fields});
  }

  judgeTag ({id, decision}) {
    const done = ((err, res) => {
      if (err) {
        this.actions.judgeTagFail({id, decision, data: err});
      } else {
        this.actions.judgeTagSuccess({id, decision, data: res.body});
      }
    });
    ajax.put('/api/tags/' + id +'/judge')
      .send({decision})
      .end(done)

    this.actions.judgeTagPending({id, decision});
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
