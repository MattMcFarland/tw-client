import React from 'react';
import BasePost from '../Common/BasePost';
import TutReqActions from '../../actions/TutReqActions';

// TODO: Use DRY approach for the handlers, many repeated.

export default class TutorialSolution extends BasePost {

  static displayName = "TutorialSolution"
  static defaultProps = {
    volatile: {
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
  constructor(props) {
    super(props);
    this.handlers = {
      onVoteUp: () => {
        TutReqActions.vote({
          direction: "up",
          collection: "solutions",
          id: props.data.id,
          type: props.data.type
        });
      },
      onVoteDown: () => {
        TutReqActions.vote({
          direction: "down",
          collection: "solutions",
          id: props.data.id,
          type: props.data.type
        });
      },
      onCommentRevealForm: () => {
        TutReqActions.showCommentForm({id: props.data.id, collection: "solutions"});
      },
      onCommentSubmit: (e) => {
        e.preventDefault();
        var collection = "solutions";
        var {id, type} = e.currentTarget.dataset;
        var inputElem = document.getElementById(e.currentTarget.dataset.id + '-input');
        var message = inputElem.value;
        TutReqActions.addComment({id, type, collection, message});
      },
      onFlagSave: (e) => {
        TutReqActions.toggleFlag({
          type: props.data.type,
          collection: "solutions",
          id: e.currentTarget.dataset.id,
          flagType: e.currentTarget.dataset.key
        })
      },
      onEnableEditContent: () => {
        TutReqActions.toggleItemEdit({
          type: props.data.type,
          collection: "solutions",
          id: props.data.id
        })
      },
      onEditContentSave: (e) => {
        e.preventDefault();
        var inputElem = document.getElementById(props.data.id + '-edit-content');
        var content = inputElem.value;
        console.debug('update item from', inputElem,'with',content);
        TutReqActions.updateItem({
          type: props.data.type,
          collection: "solutions",
          id: props.data.id,
          fields: { content },
          items: ['content', 'editorUrl', 'editorName', 'updated_at', 'created_at']
        })
      },
      onDelete: (e) => {
        var id = e.currentTarget.dataset.id;
        TutReqActions.deleteItem({
          id,
          collection: "solutions",
          type: props.data.type

        });
      },
      comments: {
        onVoteUp: (e) => {
          TutReqActions.vote({
            type: "Comment",
            collection: "comments",
            parent: {
              id: props.data.id,
              type: "Solution",
              collection: "solutions"
            },
            direction: "up",
            id: e.currentTarget.dataset.id
          });
        },
        onFlagSave: (e) => {
          TutReqActions.toggleFlag({
            type: 'Comment',
            parent: {
              id: props.data.id,
              type: "Solution",
              collection: "solutions"
            },
            id: e.currentTarget.dataset.id,
            flagType: e.currentTarget.dataset.key
          })
        },
        onEnableEdit: (e) => {
          TutReqActions.toggleItemEdit({
            type: 'Comment',
            parent: {
              id: props.data.id,
              type: "Solution",
              collection: "solutions"
            },
            collection: 'comments',
            id: e.currentTarget.dataset.id
          })
        },

        onEditChange: (e) => {
          //TutReqActions.vote(props.data.id, "down");
        },

        onEditSave: (e) => {
          e.preventDefault();
          var id = e.currentTarget.dataset.id;
          var inputElem = document.getElementById(e.currentTarget.dataset.id + '-edit-input');
          var message = inputElem.value;
          TutReqActions.updateItem({
            id,
            collection: "comments",
            parent: {
              id: props.data.id,
              type: "Solution",
              collection: "solutions"
            },
            type: "Comment",
            items: ['message', 'updated_at', 'editorUrl', 'editorName'],
            fields: {message}
          });
        },

        onDelete: (e) => {
          var id = e.currentTarget.dataset.id;
          TutReqActions.deleteItem({
            id,
            collection: "comments",
            parent: {
              id: props.data.id,
              type: "Solution",
              collection: "solutions"
            },
            type: "Comment"
          });
        }
      }
    }
  }

  renderEmbeddedVideo = () => {
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={this.props.data.linkMeta.embedUrl}/>
      </div>
    );
  }
  renderLinkMetaThumb = () => {
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <a href={this.props.data.linkMeta.url}>
          <img className="embed-responsive-item" src={this.props.data.linkMeta.thumbnailUrl}/>
        </a>
      </div>
    )
  }
  renderLinkMeta = () => {
    var embedVideo = (this.props.data.linkMeta.embedUrl);

    return (
      <div style={{marginTop: "20px"}} className="col-xs-10 content-cell">
        <div className="col-sm-6">
          {embedVideo ? this.renderEmbeddedVideo() : this.renderLinkMetaThumb()}
        </div>
        <div className="col-sm-6">
          <p style={{fontSize: '18px', textAlign: 'center'}}>{this.props.data.linkMeta.description}</p>
        </div>
      </div>
    )
  }

  renderBody = () => {
    return (
      <section className="panel-body">
        <div className="row">
          {this.renderVoteCell()}
          {this.renderLinkMeta()}
        </div>
        <hr/>
        <div className="row">
          {this.props.volatile.isEditing ? this.renderEditContentCell() : this.renderContentCell()}
        </div>
      </section>
    );
  }

  renderFooter = () => {
    return (
      <footer className="panel-footer">

        {this.props.data.comments.length ?
          <section className="comment-zone">
            <h5>Comments</h5>
            <ul>{this.renderCommentList()}</ul>
          </section>
          :
          <h5>No Comments</h5>
        }
        {this.props.volatile.isAddingComment ?
          <img src="/img/loading.gif"/> :
          this.props.volatile.isAddCommentFormExpanded ?
            this.commentForm() :
            <button onClick={this.handlers.onCommentRevealForm} className="btn btn-link">Add Comment</button>
        }


      </footer>
    );
  }

  render () {
    return (
      <section className="container-fluid">
        <div className="panel tutorial-request post">
          {this.renderHeading()}
          {this.renderBody()}
          {this.renderFooter()}
        </div>
      </section>

    );
  }


}
