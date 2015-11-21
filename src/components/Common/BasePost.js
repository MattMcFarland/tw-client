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
      <h2 className="title">{this.props.data.title}
        {!this.props.data.isOwner ?
          <FlagMenu
            onFlagSave={this.handlers.onFlagSave}
            contextId = {this.props.data.id}
            userFlags = {this.props.data.userFlags}/>
          : '' }
      </h2>
    );
  }
  renderVoteCell = () => {
    return (
      <div className="vote-cell">
        <div className="vote vote-lg">
          <button
            onClick={this.handlers.onVoteUp}
            disabled={this.props.volatile.lockVote}
            className="up"
          >
            <span
              className={this.props.data.userVote === 1 ?
              "icon ion-chevron-up active" :
              "icon ion-chevron-up"}
            />
          </button>
          <span className="score">{this.props.data.score}</span>
          <button
            onClick={this.handlers.onVoteDown}
            disabled={this.props.volatile.lockVote}
            className="down">
            <span
              className={this.props.data.userVote === -1 ?
              "icon ion-chevron-down active" :
              "icon ion-chevron-down"}
            />
          </button>
        </div>
      </div>
    );
  }
  renderContentMeta = () => {
    if (this.props.data.editorName && this.props.data.editorName !== this.props.data.authorName) {
      return (
        <section className="meta">
          <div className="user">
            <div className="body editor">
              <div className="avatar-container">
                <img className="avatar" src="http://lorempixel.com/32/32/people/" alt="Avatar" />
              </div>
              <div className="meta">
                <div className="user-name"><a className="p-name u-url" href={this.props.data.editorUrl}>{this.props.data.editorName}</a></div>
                <div className="timestamp">{moment(this.props.data.updated_at).fromNow()}</div>
              </div>
            </div>
          </div>
          <div className="user">
            <div className="body author">
              <div className="avatar-container">
                <img className="avatar" src="http://lorempixel.com/32/32/people/" alt="Avatar" />
              </div>
              <div className="meta">
                <div className="user-name"><a className="p-name u-url" href={this.props.data.editorUrl}>{this.props.data.editorName}</a></div>
                <div className="timestamp">{moment(this.props.data.updated_at).fromNow()}</div>
              </div>
            </div>
          </div>
        </section>
      );
    }
    else {
      return (
        <section className="meta">
          <div className="user">
            <div className="body author">
              <div className="avatar-container">
                <img className="avatar" src="http://lorempixel.com/32/32/people/" alt="Avatar" />
              </div>
              <div className="meta">
                <div className="user-name"><a className="p-name u-url" href={this.props.data.editorUrl}>{this.props.data.editorName}</a></div>
                <div className="timestamp">{moment(this.props.data.updated_at).fromNow()}</div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
  innerContent = () => {
    return <div style={{minHeight: '98px'}}>
      <div dangerouslySetInnerHTML={{__html: marked(this.props.data.content.toString(), {sanitize: true}) }} />
    </div>;
  }
  renderContentCell = () => {
    var tags;
    if (this.props.data.tags) {
      tags = this.props.volatile.isEditingTags ? this.editTagList() : <ul className="tags">{this.renderTagList()}</ul>;
    }

    return (
      <div className="content-cell ">
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
        {tags ? tags : ''}
        {tags && this.props.data.userPrivs.userCanEdit && !this.props.volatile.isEditingTags && !this.props.volatile.editLocked && !this.props.data.removed ?
          <button data-id={this.props.data.id} onClick={this.handlers.onEnableEditTags} className="edit-control" type="button">
            <span className="icon ion ion-edit">&nbsp;</span>Edit tags
          </button> :
          ''
        }
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
              className={tag.is_pending ? "tag pending" : "tag approved"}
              title={tag.is_pending ? "This tag is pending approval by moderators and may be removed" : "Tutorial request tagged with" + tag.name}
          >{tag.name}
            {tag.is_pending && this.props.data.userPrivs && this.props.data.userPrivs.isModerator ?
              <span>
          <button data-id={tag.id} onClick={this.handlers.onApproveTag}>
            <span className="icon ion-thumbsup"/>
          </button>
           <button data-id={tag.id} onClick={this.handlers.onDenyTag}>
             <span className="icon ion-thumbsdown"/>
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
    var commentCtl = <div>
      {this.props.volatile.isAddingComment ?
        <img src="/img/loading.gif"/> :
        this.props.volatile.isAddCommentFormExpanded ?
          this.commentForm() :
          <button onClick={this.handlers.onCommentRevealForm} style={{paddingLeft: '0',marginTop: '1em'}}className="edit-control">Add Comment</button>
      }
    </div>;


    return (
      <footer>
        <section className="comments">
          <header>
            <h4><span className="icon ion-chatbubbles"/>Comments</h4>
          </header>

          {this.props.data.comments.length ?
            <section className="comment-zone">
              <ul>{this.renderCommentList()}</ul>
              {commentCtl}
            </section>
            :
            <div>
              <h5>No Comments</h5>
              {commentCtl}
            </div>
          }
        </section>



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
        className={this.props.data.removed ? "deleted tut-request-detail" : "tut-request-detail"}>
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
