import React from 'react';
import moment from 'moment';
import FlagMenu from './FlagMenu';
export default class Comment extends React.Component {

  static defaultProps = {
    volatile: {}
  }
  editTime = () => {
    return moment(this.props.updated_at).fromNow();
  }

  createTime = () => {
    return moment(this.props.created_at).fromNow();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.volatile.isEditing) {
      var inputElem = document.getElementById(this.props.id + '-edit-input');
      inputElem.focus();
    }
  }

  voteControl = () => {
    return (
      <menu className="inline-vote">
        <button
          disabled={this.props.volatile.lockVote}
          data-id={this.props.id}
          onClick={this.props.handlers.onVoteUp}
          >
            <span
              className={this.props.userVote === 1 ?
                          "glyphicon glyphicon-menu-up active" :
                          "glyphicon glyphicon-menu-up"}
              />
        </button>
        &nbsp;
        <span>{this.props.score}</span>
        &nbsp;
      </menu>
    )
  }

  displayComment = () => {
    return (
      <div>

        {!this.props.removed ? this.voteControl() : ''}
        <span>{this.props.message}</span>
        <span>&nbsp;-</span>
        <a href={this.props.authorUrl}>
          <span
            className={this.props.isOwner ? 'owner' : 'user'}>
            {this.props.isOwner ? 'You' : this.props.authorName}</span>
        </a>
        {this.props.editorName && this.props.authorName === this.props.editorName ? <sup>Edited</sup> : ''}
        {this.props.editorName && this.props.authorName !== this.props.editorName ? <sup>Edited by <a href={this.props.editorUrl}>{this.props.editorName}</a></sup> : ''}
        <em><span>&nbsp;</span><span>{this.props.editorName ? this.editTime() : this.createTime() }</span></em>

        {this.props.userPrivs.userCanEdit && !this.props.volatile.isEditing && !this.props.editLocked && !this.props.removed ?
          <button data-id={this.props.id} onClick={this.props.handlers.onEnableEdit} className="btn btn-link" type="button">
            <span className="glyphicon glyphicon-pencil"/>
          </button> :
          ''
        }

        {this.props.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.editLocked && !this.props.removed ?
          <button data-id={this.props.id} onClick={this.props.handlers.onDelete} className="btn btn-link" type="button">
            <span className="glyphicon glyphicon-trash"/>
          </button> :
          ''
        }

        {this.props.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.editLocked && this.props.removed ?
          <button data-id={this.props.id} onClick={this.props.handlers.onDelete} className="btn btn-link" type="button">
            Undo Delete
          </button> :
          ''
        }


        {!this.props.removed && !this.props.isOwner ?
          <FlagMenu
            onFlagSave = {this.props.handlers.onFlagSave}
            contextId  = {this.props.id}
            userFlags  = {this.props.userFlags}/>
          : ''}

      </div>
    );
  }

  commentEditForm = () => {
    return (
      <form data-id={this.props.id}
            onSubmit={this.props.handlers.onEditSave}>
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
      <section id={"comment-" + this.props.id} className={this.props.removed ? "deleted" : ""}>
        {this.props.volatile.isEditing ? this.commentEditForm() : this.displayComment()}
      </section>
    )
  }
}
