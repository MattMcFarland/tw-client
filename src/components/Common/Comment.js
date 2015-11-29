import React, {Component} from 'react';
import moment from 'moment';
import FlagMenu from './FlagMenu';
import classNames from 'classnames';
import PopUp from './PopUp';
import { FacebookBtn, TwitterBtn, EmailBtn } from './ShareBtns';

class CommentHeading extends Component {

  editTime = () => {
    return moment(this.props.updated_at).fromNow();
  }

  createTime = () => {
    return moment(this.props.created_at).fromNow();
  }

  renderAuthor = () => {
    let selfEdited = this.props.editorName && this.props.authorName === this.props.editorName;
    let superEdited = this.props.editorName && this.props.authorName !== this.props.editorName;



    return (
      <span
        className="comment-author">
      <a href={this.props.authorUrl}>
          <span
            className={this.props.isOwner ? 'owner' : ''}>
            {this.props.isOwner ? 'You' : this.props.authorName}</span>
      </a>
        {this.props.volatile.isSaving ? <sup className="edit">Saving...</sup> : ''}
    {selfEdited ? <sup className="edit">Edited&nbsp;<span> -</span>{this.editTime()}</sup> : ''}
    {superEdited ? <sup className="edit">Edited by <a href={this.props.editorUrl}>{this.props.editorName}</a><span> -</span>{this.editTime()}</sup> : ''}
    </span>
    )
  };

  render () {

    let { removed, isOwner, editorName, id, userFlags } = this.props;
    let isSaving = this.props.volatile.isSaving;
    let isLocked = this.props.volatile.editLocked;

    return (
      <header>
        <h4>
          {this.renderAuthor()}
          &nbsp;
          {!removed && !isOwner && !isLocked && !isSaving ?
            <FlagMenu
              defaultFlags = {[
                { "key": "spam",      "value": false },
                { "key": "offensive", "value": false }
              ]}
              onFlagSave = {this.props.handlers.onFlagSave}
              contextId  = {id}
              userFlags  = {userFlags}/>
            : ''}

          <span
            style = {{ display: isSaving ? 'inline' : 'none' }}
            className="minispin"><img src="/img/minispin.gif"/>
          </span>
          <span
            style = {{ display: isSaving ? 'none' : 'inline' }}
            className="timestamp">{ this.createTime() }
          </span>
        </h4>
      </header>
    );
  }
}



class CommentBody extends Component {

  displayEditControls = () => {
    return (
    <div className="edit-controls">
      {this.props.userPrivs.userCanEdit && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.removed ?
        <button data-tipsy="Edit this comment " className="tipsy tipsy--sw edit-control" data-id={this.props.id} onClick={this.props.handlers.onEnableEdit} type="button">
          <span className="icon ion ion-edit"/>
        </button> :
        ''
      }
      {this.props.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.volatile.editLocked && !this.props.removed ?
        <button data-tipsy="Delete this comment" className="tipsy tipsy--sw edit-control" data-id={this.props.id} onClick={this.props.handlers.onDelete} type="button">
          <span className="icon ion ion-ios-trash"/>
        </button> :
        ''
      }
      {this.props.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.editLocked && this.props.removed ?
        <button data-id={this.props.id} onClick={this.props.handlers.onDelete} className="edit-control" type="button">
          Undo Delete
        </button> :
        ''
      }

    </div>
    )
  };
  displayComment = () => {
    return (
      <div>
        <span>{this.props.message}</span>
        {this.displayEditControls()}
      </div>
    );
  }
  commentEditForm = () => {

    var commentError;
    // key could be tags title and/or content
    if (this.props.error && this.props.error.data) {
      let data = this.props.error.data;
      data.forEach((err) => {
        console.log(err);
        if (err.el === "message") {
          commentError = err.error;
        }
      })
    }


    return (
      <form data-id={this.props.id}
            onSubmit={this.props.handlers.onEditSave}>
        {commentError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{commentError}</aside> : ''}

        <input
          id={this.props.id + '-edit-input'}
          style={{width:"100%"}}
          defaultValue={this.props.message}/>
        <button type="submit" className="btn btn-block btn-info">Save</button>
        <button type="button"
                data-id={this.props.id}
                onClick={this.props.handlers.onEnableEdit}
                className="btn btn-block btn-default">Cancel</button>
      </form>
    );
  }

  render () {
    return (
      <div>
        {this.props.volatile.isEditing ? this.commentEditForm() : this.displayComment()}
      </div>
    );
  }

}

class CommentFooter extends Component {

  render () {
    var shareUrl = window.location + "/#comment-" + this.props.id;
    return (
      <footer className="comment-footer">
        <div className="vote-section">
          <button
            disabled={this.props.volatile.lockVote}
            data-id={this.props.id}
            onClick={this.props.handlers.onVoteUp}
            data-tipsy={this.props.userVote === 1 ?
                          "Remove vote" :
                          "Vote up"}
            className="tipsy tipsy--n"
          >
            <span
              className={this.props.userVote === 1 ?
                          "icon ion-chevron-up active" :
                          "icon ion-chevron-up"}
            />
          </button>
          <span className="score">{this.props.score}</span>
        </div>
        <div className="share-section">
          <PopUp tooltip="Share options" tooltipClass="tipsy--n" direction="down" icon="share">
            <FacebookBtn href={shareUrl}/>
            <TwitterBtn href={shareUrl}/>
            <EmailBtn href={shareUrl}/>
          </PopUp>
        </div>
      </footer>
    );
  }
}

export default class Comment extends Component {

  static defaultProps = {
    volatile: {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.volatile.isEditing) {
      var inputElem = document.getElementById(this.props.id + '-edit-input');
      inputElem.focus();
    }
  }

  render () {

    var classes = classNames('comment', {
      'deleted': this.props.removed,
      'saving': this.props.volatile.isSaving
    });

    return (
      <div
        id={"comment-" + this.props.id}
        className={classes}>

        <CommentHeading {...this.props}/>
        <CommentBody    {...this.props}/>
        <CommentFooter  {...this.props}/>

      </div>
    )
  }
}
