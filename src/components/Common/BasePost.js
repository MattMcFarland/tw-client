import React, { Component } from 'react';
import Comment from './Comment';
import FlagMenu from './FlagMenu';
import moment from 'moment';
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
          <FlagMenu
            onFlagSave={this.props.handlers.onFlagSave}
            contextId = {this.props.data.id}
            userFlags = {this.props.data.userFlags}/>
        </h3>
      </header>
    );
  }
  renderVoteCell = () => {
    return (
      <div className="col-xs-2 votecell">
        <menu className="vote-block-slab">
          <button
            onClick={this.props.handlers.onVoteUp}
            disabled={this.props.data.lockVote}
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
            onClick={this.props.handlers.onVoteDown}
            disabled={this.props.data.lockVote}
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
            Requested by:
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
              Requested by:
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
      <div className="col-xs-10 content-cell">
        <div className="content-body">
        <p>{this.props.data.content}</p>
        {this.renderContentMeta()}
        </div>
      </div>
    );
  }
  renderBody = () => {
    return (
      <section className="panel-body">
        <div className="row">
        {this.renderVoteCell()}
        {this.renderContentCell()}
        </div>
      </section>
    );
  }
  renderTagList = () => {
    return this.props.data.tags.map((li) => {
      return (
        <li key={li.id}>
          {li.name}
        </li>
      );
    });
  }
  renderCommentList = () => {
    return this.props.data.comments.map((li) => {
      return (

        <li key={li.id}>

          <Comment
            {...li}
            handlers={this.props.handlers.comments}
            />
        </li>
      );
    });
  }
  commentForm = () => {
    return (
      <form

            data-type={this.props.data.type}
            onSubmit={this.props.handlers.onCommentSubmit}
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

      <ul className="taglist">
        {this.renderTagList()}
      </ul>

        {this.props.data.comments.length ?
          <section className="comment-zone">
          <h5>Comments</h5>
          <ul>{this.renderCommentList()}</ul>
          </section>
          :
          <h5>No Comments</h5>
        }
      {this.props.data.volatile.isAddingComment ?
        <img src="/img/loading.gif"/> :
          this.props.data.volatile.isAddCommentFormExpanded ?
            this.commentForm() :
              <button onClick={this.props.handlers.onCommentRevealForm} className="btn btn-link">Add Comment</button>
      }


    </footer>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.volatile.isAddCommentFormExpanded) {
      var inputElem = document.getElementById(this.props.data.id + '-input');
      inputElem.focus();
    }
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

