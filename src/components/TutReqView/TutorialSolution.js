import React from 'react';
import BasePost from '../Common/BasePost';
import TutReqActions from '../../actions/TutReqActions';
import FlagMenu from '../Common/FlagMenu';

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
        //console.debug('update item from', inputElem,'with',content);
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
      <section>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={this.props.data.linkMeta.embedUrl}/>
        </div>
        <p style={{padding: '0.25em 0'}}>{this.props.data.linkMeta.description}</p>
      </section>
    );
  }
  renderLinkMetaThumb = () => {
    return (
    <div className="image"
         style = {{backgroundImage: 'url(' + this.props.data.linkMeta.thumbnailUrl + ')'}}>
      <div className="foreground">
        <p className="description">
          {this.props.data.linkMeta.description}
        </p>
        <footer>
          <a href={this.props.data.linkMeta.url} className="btn btn-primary">Get it</a>
        </footer>
      </div>
    </div>
    )
  }
  renderLinkMeta = () => {
    var embedVideo = (this.props.data.linkMeta.embedUrl);

    return (
      <section className="link-meta">
        {this.props.data.linkMeta.embedUrl ?
          this.renderEmbeddedVideo() :
          this.renderLinkMetaThumb()}
      </section>
    )
  }

  renderContentCell = () => {

    return (
      <div className="content-cell ">

        {this.renderLinkMeta()}

        <hr/>

        <section className="body">
          {this.props.data.userPrivs.userCanEdit && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.data.removed ?
            <button className="edit-control" data-id={this.props.data.id} onClick={this.handlers.onEnableEditContent} type="button">
              <span className="icon ion ion-edit"/>
            </button> :
            ''
          }

          {this.props.data.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.data.removed ?
            <button className="edit-control" data-id={this.props.data.id} onClick={this.handlers.onDelete} type="button">
              <span className="icon ion ion-ios-trash"/>
            </button> :
            ''
          }

          {this.props.data.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.volatile.editLocked && this.props.data.removed ?
            <button data-id={this.props.data.id} onClick={this.handlers.onDelete} type="button">
              Undo Delete
            </button> :
            ''
          }
          <div id={this.props.data.id + '-marked'} key={this.props.data.id + '-marked'} >
            {this.innerContent()}
          </div>
          {this.renderContentMeta()}

        </section>

      </div>
    );
  }

  renderHeading = () => {
    return (
      <h2 className="title">
        <span className="icon ion-android-open"/>
        {this.props.data.title}
        {!this.props.data.isOwner ?
          <FlagMenu
            onFlagSave={this.handlers.onFlagSave}
            contextId = {this.props.data.id}
            userFlags = {this.props.data.userFlags}/>
          : '' }
      </h2>
    );
  }

  render () {
    return (
    <section
      id={"tutorialsolution-" + this.props.data.id}
      style={this.props.volatile.editLocked ? this.faded() : {}}
      className={this.props.data.removed ? "deleted tut-solution-detail" : "tut-solution-detail"}>
      <section className="title">
        {this.renderHeading()}
      </section>
      <div className="content">
        {this.renderVoteCell()}
        {this.props.volatile.isEditing ? this.renderEditContentCell() : this.renderContentCell()}

      </div>
      {this.props.data.removed ? '' : this.renderFooter()}
    </section>
    );
  }

}

/**
<section className="tut-solution-detail">
  <section className="title">
    <h2><span className="icon ion-android-open"></span>Over 200 CSS / HTML Tricks</h2>
  </section>
  <div className="content">
    <div className="vote-cell">
      {{> molecules-vote-lg }}
    </div>
    <div className="content-cell">
      <section className="link-meta">
        <div className="image" style="background-image: url(http://lorempixel.com/800/600/nature);">
          <div className="foreground">
            <p className="description">Ei sea eros inermis epicuri, nec ei commodo neglegentur concludaturque. Pri quot luptatum liberavisse et, his solum pericula explicari id. An essent concludaturque sed</p>
            <footer>
              <button className="btn btn-primary">Get it</button>
            </footer>
          </div>
        </div>
      </section>
      <hr/>
      <section className="body">
        <p>Donec eu libero sit amet quam egestas semperlaoreet non velit non, oin lobortis pellentesque felis... Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
      </section>
      <section className="meta">
        {{> molecules-user-meta}}
      </section>
    </div>
  </div>
  <footer>
    {{> organisms-comment-list}}
  </footer>
</section>
 */
