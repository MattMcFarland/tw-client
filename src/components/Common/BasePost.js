import React, { Component } from 'react';
import uniq from 'lodash.uniq';
import Comment from './Comment';
import FlagMenu from './FlagMenu';
import moment from 'moment';
import { MarkedArea } from './FormFields';
import marked from 'marked';
import Select from './Select';
import Spinner from './Spinner';


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
      /*
      linkMeta: React.PropTypes.shape({
        title: React.PropTypes.string,
        url: React.PropTypes.url,
        description: React.PropTypes.string
      }),*/

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
  onTagChange = (value, array) => {

    var tagSelect = this.refs.tags;
    var tags = value.split(',');
    var nt = [].concat(uniq(tags));
    if (nt.length !== tags.length) {
      console.warn('duplicates found');
      console.log(tagSelect);
    }

  }
  renderHeading = () => {

    let { isOwner, id, userFlags, title } = this.props.data;

    return (
      <h2 className="title">{title}
        {!isOwner ?
          <FlagMenu
            defaultFlags={[
                  { "key": "spam",      "value": false },
                  { "key": "offensive", "value": false },
                  { "key": "vague",     "value": false },
                  { "key": "duplicate", "value": false }
            ]}
            onFlagSave={this.handlers.onFlagSave}
            contextId = {id}
            userFlags = {userFlags}/>
          : '' }
      </h2>
    );
  }
  renderVoteCell = () => {
    return (
      <div className="vote-cell">
        <div className="vote vote-lg">
          <button
            data-tipsy={this.props.data.userVote === 1 ?
             'Remove vote' : 'Vote up'
            }
            className="tipsy tipsy--n up"
            onClick={this.handlers.onVoteUp}
            disabled={this.props.volatile.lockVote}
          >
            <span
              className={this.props.data.userVote === 1 ?
              "icon ion-chevron-up active" :
              "icon ion-chevron-up"}
            />
          </button>
          <span className="score">{this.props.data.score}</span>
          <button
            data-tipsy={this.props.data.userVote === -1 ?
             'Remove vote' : 'Vote down'
            }
            className="tipsy tipsy--s down"
            onClick={this.handlers.onVoteDown}
            disabled={this.props.volatile.lockVote}
            >
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
          <div className="user editor">
            <div className="body editor">
              {this.props.data.editorAvatar ? <div className="avatar-container"><img className="avatar" src={this.props.data.editorAvatar} alt="Avatar" /></div> : ''}
              <div className="meta">
                <div className="user-name"><a className="p-name u-url" href={this.props.data.editorUrl}>{this.props.data.editorName}</a></div>
                <div className="timestamp">{moment(this.props.data.updated_at).fromNow()}</div>
              </div>
            </div>
          </div>
          <div className="user author">
            <div className="body author">
              {this.props.data.authorAvatar ? <div className="avatar-container"><img className="avatar" src={this.props.data.authorAvatar} alt="Avatar" /></div> : ''}
              <div className="meta">
                <div className="user-name"><a className="p-name u-url" href={this.props.data.authorUrl}>{this.props.data.authorName}</a></div>
                <div className="timestamp">{moment(this.props.data.created_at).fromNow()}</div>
              </div>
            </div>
          </div>
        </section>
      );
    }
    else {
      return (
        <section className="meta">
          <div className="user author">
            <div className="body author">
              {this.props.data.authorAvatar ? <div className="avatar-container"><img className="avatar" src={this.props.data.authorAvatar} alt="Avatar" /></div> : ''}
              <div className="meta">
                <div className="user-name"><a className="p-name u-url" href={this.props.data.authorUrl}>{this.props.data.authorName}</a></div>
                <div className="timestamp">{moment(this.props.data.created_at).fromNow()}</div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
  innerContent = () => {
    return <div className="inner-content">
      <div dangerouslySetInnerHTML={{__html: marked(this.props.data.content.toString(), {sanitize: true}) }} />
    </div>;
  }
  renderContentCell = () => {
    var tags;
    if (this.props.data.tags) {
      tags = this.props.volatile.isEditingTags ? this.editTagList() : <ul className="tags">{this.renderTagList()}</ul>;
    }

    return (
      <div style={{
      opacity: this.props.volatile.editLocked ? 0.5 : 1
      }}
           className="content-cell ">
        <section className="body">



          {this.props.data.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.data.removed ?
            <button style={{lineHeight: '1.125'}} data-tipsy="Delete this post" className="tipsy tipsy--sw edit-control" data-id={this.props.data.id} onClick={this.handlers.onDelete} type="button">
              <span className="icon ion ion-ios-trash"/>
            </button> :
            ''
          }

          {this.props.data.userPrivs.userCanEdit && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.data.removed ?
            <button style={{lineHeight: '1.125'}}  data-tipsy="Edit this comment" className="tipsy tipsy--sw edit-control" data-id={this.props.data.id} onClick={this.handlers.onEnableEditContent} type="button">
              <span className="icon ion ion-edit"/>
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
            {this.props.volatile.editLocked ? <Spinner top="30px"/>: ''}

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
    var contentError;

    // key could be tags title and/or content
    if (this.props.data.error && this.props.data.error.data) {

      let data = this.props.data.error.data;
      data.forEach((err) => {
        console.log(err);
        if (err.el === "content") {
          contentError = err.error;
        }
      })
    }
    return (
      <div className="content-cell">
        {contentError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{contentError}</aside> : ''}
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
    var tagError;
    // key could be tags title and/or content
    if (this.props.data.error && this.props.data.error.data) {

      let data = this.props.data.error.data;
      data.forEach((err) => {
        console.log(err);
        if (err.el === "tags") {
          tagError = err.error;
        }
      })
    }


    return (
      <form onSubmit={this.handlers.onEditTagsSave}>
        <label>
          <span className="form-label">Tags:</span>
          {tagError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{tagError}</aside> : ''}
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
            onChange={this.onTagChange}
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

    let tags = (Array.isArray(this.props.data.tags)) ? this.props.data.tags : this.props.data.tags.split(',');

    return tags.map((tag, index) => {

      if (tag.is_approved || tag.is_pending) {
        return (
          <li key={tag.id + '-' + index}
              className={tag.is_pending ? "tag pending" : "tag approved"}
              title={tag.is_pending ? "This tag is pending approval by moderators and may be removed" : "Tutorial request tagged with" + tag.name}
          >{tag.name}
            {tag.is_pending && this.props.data.userPrivs && this.props.data.userPrivs.isModerator ?
              <span>
          <button data-tipsy="Approve tag" className="tipsy tipsy--n" data-id={tag.id} onClick={this.handlers.onApproveTag}>
            <span className="icon ion-thumbsup"/>
          </button>
           <button data-tipsy="Remove tag" className="tipsy tipsy--n" data-id={tag.id} onClick={this.handlers.onDenyTag}>
             <span className="icon ion-thumbsdown"/>
           </button>
        </span> : ''}
          </li>
        );
      } else {
        return (<li style={{display:'none'}}key={tag.id + '-' + index}/>);
      }

    });
  }
  renderCommentList = () => {
    return this.props.data.comments.map((li) => {
      return (

        <li key={li.id}>

          <Comment
            {...li}
            error={this.props.data.commentError}
            handlers={this.handlers.comments}
          />
        </li>
      );
    });
  }
  commentForm = () => {
    var commentError;
    // key could be tags title and/or content
    if (this.props.data.commentError && this.props.data.commentError.data) {
      let data = this.props.data.commentError.data;
      data.forEach((err) => {
        console.log(err);
        if (err.el === "message") {
          commentError = err.error;
        }
      })
    }

    return (
      <form

        data-type={this.props.data.type}
        onSubmit={this.handlers.onCommentSubmit}
        data-id={this.props.data.id}
        style={{margin:"0", padding:"0"}}>
        <label style={{width: "100%"}}>
          {commentError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{commentError}</aside> : ''}
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
        <div className="hpreloader">
          <div className="preload preload-top"/>
          <div className="preload preload-bottom"/>
        </div> :
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
