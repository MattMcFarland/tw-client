import React, { Component } from 'react';
import Comment from './Comment';
import FlagMenu from './FlagMenu';
import moment from 'moment';
import { MarkedArea } from './FormFields';
import marked from 'marked';
import Select from 'react-select';

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

/**
 * BasePost for Tutorial Request and Tutorial Solution
 */
export default class BasePost extends Component {

  constructor(props) {
    super(props);
  }
  static propTypes = {
    handlers: React.PropTypes.shape({
      // Voting
      onVoteUp: React.PropTypes.func.isRequired,
      onVoteDown: React.PropTypes.func.isRequired,
      // Flagging
      onFlagSave: React.PropTypes.func,
      // Tagging


      onTagEditSave: React.PropTypes.func,
      // Content Edit/Save
      onEditContentSave: React.PropTypes.func,
      // Content Edit view state handlers turn editContent off/on
      onEnableEditContent: React.PropTypes.func,
      onDisableEditContent: React.PropTypes.func,
      onDelete: React.PropTypes.func,

      onEnableEditLinkMeta: React.PropTypes.func,
      onDisableEditLinkMeta: React.PropTypes.func,
      // Adding Comments
      onCommentSubmit: React.PropTypes.func.isRequired,
      // Revealing Comment Form
      onCommentRevealForm: React.PropTypes.func.isRequired,
      onTagChange: React.PropTypes.func,
      comments: React.PropTypes.shape({
        // Comment Voting
        onVoteUp: React.PropTypes.func.isRequired,
        // Comment Flagging
        onFlagSave: React.PropTypes.func,
        // Comment Edit
        onEnableEdit: React.PropTypes.func,
        onEditChange: React.PropTypes.func,
        onEditSave: React.PropTypes.func,
        onDelete: React.PropTypes.func
      })
    }),
    volatile: React.PropTypes.shape({
      isAddCommentFormExpanded: React.PropTypes.bool,
      currentAddCommentValue: React.PropTypes.string,
      isDeleted: React.PropTypes.bool,
      isEditingContent: React.PropTypes.bool,
      isEditingLinkMeta: React.PropTypes.bool,
      userCanEdit: React.PropTypes.bool,
      userCanDelete: React.PropTypes.bool,
      userCanSeeDeleted: React.PropTypes.bool,
      isAddingComment: React.PropTypes.bool,
    }),
    data: React.PropTypes.shape({
      type: React.PropTypes.string,
      created_at: React.PropTypes.date,
      updated_at: React.PropTypes.date,
      title: React.PropTypes.string,
      permalink: React.PropTypes.string,
      content: React.PropTypes.string,
      linkMeta: React.PropTypes.shape({
        title: React.PropTypes.string,
        url: React.PropTypes.url,
        description: React.PropTypes.string
      }),
      tags: React.PropTypes.array,
      authorName: React.PropTypes.string,
      authorUrl: React.PropTypes.string,
      editorName: React.PropTypes.string,
      editorUrl: React.PropTypes.string,
      flags: React.PropTypes.shape({
        spam: React.PropTypes.number,
        offensive: React.PropTypes.number,
        vague: React.PropTypes.number,
        duplicate: React.PropTypes.number
      }),
      score: React.PropTypes.number,
      solutions: React.PropTypes.array,
      comments: React.PropTypes.array,
      removed: React.PropTypes.bool
    })
  }
  renderHeading = () => {
    return (
      <header className="panel-heading">
        <h3>{this.props.data.title}
          {!this.props.data.isOwner ?
            <FlagMenu
              onFlagSave={this.handlers.onFlagSave}
              contextId = {this.props.data.id}
              userFlags = {this.props.data.userFlags}/>
              : '' }
        </h3>
      </header>
    );
  }

  renderVoteCell = () => {
    return (
      <div className="col-xs-2 votecell">
        <menu className="vote-block-slab">
          <button
            onClick={this.handlers.onVoteUp}
            disabled={this.props.volatile.lockVote}
            className="btn btn-link"
          >
            <span
              className={this.props.data.userVote === 1 ?
              "glyphicon glyphicon-chevron-up active" :
              "glyphicon glyphicon-chevron-up"}
            />
          </button>
          <p className="score">{this.props.data.score}</p>
          <button
            onClick={this.handlers.onVoteDown}
            disabled={this.props.volatile.lockVote}
            className="btn btn-link">
            <span
              className={this.props.data.userVote === -1 ?
              "glyphicon glyphicon-chevron-down active" :
              "glyphicon glyphicon-chevron-down"}
              />
          </button>
        </menu>
      </div>
    );
  }
  renderContentMeta = () => {
    if (this.props.data.editorName) {
      return (
        <div>
        <section className="content-meta panel panel-warning col-sm-4 col-sm-offset-3">
          <h5 className="panel-heading">
            Edited by:
          </h5>
          <div className="panel-body h-card">
            <img className="u-photo" src="http://lorempixel.com/32/32/nature/" alt=""/>
            &nbsp;
            <a className="p-name u-url" href={this.props.data.editorUrl}>{this.props.data.editorName}</a>
            &nbsp;
            <em>{moment(this.props.data.updated_at).fromNow()}</em>
          </div>
        </section>
        <section className="content-meta panel panel-success col-sm-4 col-sm-offset-1">
          <h5 className="panel-heading">
            Posted by:
          </h5>
          <div className="panel-body h-card">
            <img className="u-photo" src="http://lorempixel.com/32/32/people/" alt="" />
            &nbsp;
            <a className="p-name u-url" href={this.props.data.authorUrl}>{this.props.data.authorName}</a>
            &nbsp;
            <em>{moment(this.props.data.created_at).fromNow()}</em>
          </div>
        </section>
      </div>
      );
    }
    else {
      return (
        <div>
          <section className="content-meta panel panel-success col-sm-4 col-sm-offset-8">
            <h5 className="panel-heading">
              Posted by:
            </h5>
            <div className="panel-body h-card">
              <img className="u-photo" src="http://lorempixel.com/32/32/people/" alt="" />
              &nbsp;
              <a className="p-name u-url" href={this.props.data.authorUrl}>{this.props.data.authorName}</a>
              &nbsp;
              <em>{moment(this.props.data.created_at).fromNow()}</em>
            </div>
          </section>
        </div>
      );
    }
  }
  renderContentCell = () => {
    return (
      <div className="content-cell">
        <div className="content-body">
          {this.props.data.userPrivs.userCanEdit && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.data.removed ?
            <button data-id={this.props.data.id} onClick={this.handlers.onEnableEditContent} className="btn btn-link pull-right" type="button">
              <span className="glyphicon glyphicon-pencil"/>
            </button> :
            ''
          }

          {this.props.data.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.data.removed ?
            <button data-id={this.props.data.id} onClick={this.handlers.onDelete} className="btn btn-link pull-right" type="button">
              <span className="glyphicon glyphicon-trash"/>
            </button> :
            ''
          }

          {this.props.data.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.volatile.editLocked && this.props.data.removed ?
            <button data-id={this.props.data.id} onClick={this.handlers.onDelete} className="btn btn-link pull-right" type="button">
              Undo Delete
            </button> :
            ''
          }
          <p dangerouslySetInnerHTML={{__html: marked(this.props.data.content.toString(), {sanitize: true}) }}/>
          {this.renderContentMeta()}
        </div>
      </div>
    );
  }
  renderEditContentCell = () => {
    return (
      <div className="content-cell">
        <form onSubmit = {this.handlers.onEditContentSave}>
        <MarkedArea
          label="You are editing this post"
          defaultValue={this.props.data.content}
          ref="content"
          id={this.props.data.id + '-edit-content'}
          />
        <button type="submit" className="btn btn-block btn-info">Save</button>
        <button type="button"
                data-id={this.props.data.id}
                onClick={this.handlers.onEnableEditContent}
                className="btn btn-block btn-default">Cancel</button>
        </form>
      </div>
    );
  }
  renderBody = () => {
    return (
      <section className="panel-body">
        <div className="row">
          {this.renderVoteCell()}
          <div className="col-xs-10">
            {this.props.volatile.isEditing ? this.renderEditContentCell() : this.renderContentCell()}
          </div>
        </div>
      </section>
    );
  }
  editTagList = () => {
    return (
      <form onSubmit={this.handlers.onEditTagsSave}>
        <label>
          <span className="form-label">Tags:</span>
          <em className="form-field-tip">Select between one and four tags.</em>
          <br/>
          <Select
            ref="tags"
            id={this.props.data.id + '-edit-tags'}
            allowCreate={true}
            multi={true}
            required="true"
            tagset={this.props.data.tags}
            value={this.props.data.tags.map((t)=>t.name)}
            />
        </label>
        <button type="submit" className="btn btn-block btn-info">Save</button>
        <button type="button"
                data-id={this.props.data.id}
                onClick={this.handlers.onEnableEditTags}
                className="btn btn-block btn-default">Cancel</button>
      </form>
    );
  }
  renderTagList = () => {
    return this.props.data.tags.map((tag, index) => {

      if (tag.is_approved || tag.is_pending) {
        return (
          <li key={tag.id + '-' + index}
              className={tag.is_pending ? "pending" : "approved"}
              title={tag.is_pending ? "This tag is pending approval by moderators and may be removed" : "Tutorial request tagged with" + tag.name}
            >{tag.name}
            {tag.is_pending && this.props.data.userPrivs && this.props.data.userPrivs.isModerator ?
              <span>
          <button data-id={tag.id} onClick={this.handlers.onApproveTag}>
            <span className="glyphicon glyphicon-thumbs-up"/>
          </button>
           <button data-id={tag.id} onClick={this.handlers.onDenyTag}>
             <span className="glyphicon glyphicon-thumbs-down"/>
           </button>
        </span> : ''}
          </li>
        );
      } else {
        return (<div key={tag.id + '-' + index}/>);
      }

    });
  }
  renderCommentList = () => {
    return this.props.data.comments.map((li) => {
      return (

        <li key={li.id}>

          <Comment
            {...li}
            handlers={this.handlers.comments}
            />
        </li>
      );
    });
  }
  commentForm = () => {
    return (
      <form

            data-type={this.props.data.type}
            onSubmit={this.handlers.onCommentSubmit}
            data-id={this.props.data.id}
            style={{margin:"0", padding:"0"}}>
        <label style={{width: "100%"}}>
          <span className="form-label">Add Comment:</span>
          <input
                id={this.props.data.id + '-input'}
                style={{
                   fontWeight: "normal",
                   "width": "80%"
                }}
                type="text"
                placeholder="Say something..."
                name="addComment"
            />
        </label>
      </form>
    );
  }
  renderFooter = () => {
    return (
    <footer className="panel-footer">
      {this.props.data.userPrivs.userCanEdit && !this.props.volatile.isEditingTags && !this.props.volatile.editLocked && !this.props.data.removed ?
        <button data-id={this.props.data.id} onClick={this.handlers.onEnableEditTags} className="btn btn-link pull-right" type="button">
          <span className="glyphicon glyphicon-pencil">&nbsp;</span>Edit tags
        </button> :
        ''
      }
      {this.props.volatile.isEditingTags ? this.editTagList() : <ul className="taglist">{this.renderTagList()}</ul>}

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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.volatile.isAddCommentFormExpanded) {
      var inputElem = document.getElementById(this.props.data.id + '-input');
      inputElem.focus();
    }
  }
  faded = () => {
    return {
      opacity: '0.5'
    }
  }
  render () {
    return (
      <section
        style={this.props.volatile.editLocked ? this.faded() : {}}
        className={this.props.data.removed ? "deleted container-fluid" : "container-fluid"}>
        <div className="panel tutorial-request post">
          {this.renderHeading()}
          {this.renderBody()}
          {this.props.data.removed ? '' : this.renderFooter()}
        </div>
      </section>
    );
  }

}

