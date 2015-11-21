import React, {Component} from 'react';
import moment from 'moment';
import FlagMenu from './FlagMenu';



class CommentHeading extends Component {

  editTime = () => {
    return moment(this.props.updated_at).fromNow();
  }

  createTime = () => {
    return moment(this.props.created_at).fromNow();
  }

  renderAuthor = () => {
    return (
      <span className="comment-author">
      <a href={this.props.authorUrl}>
          <span
            className={this.props.isOwner ? 'owner' : ''}>
            {this.props.isOwner ? 'You' : this.props.authorName}</span>
      </a>
    {this.props.editorName && this.props.authorName === this.props.editorName ? <sup>Edited</sup> : ''}
    {this.props.editorName && this.props.authorName !== this.props.editorName ? <sup>Edited by <a href={this.props.editorUrl}>{this.props.editorName}</a></sup> : ''}
    </span>
    )
  };

  render () {
    return (
      <header>
        <h4>
          {this.renderAuthor()}
          &nbsp;
          <button className="edit-control"><span className="icon ion-flag"/></button>
          <span className="timestamp">{this.props.editorName ? this.editTime() : this.createTime() }</span>
        </h4>
      </header>
    );
  }
}

class CommentBody extends Component {

  displayEditControls = () => {
    return (
    <div>
      {this.props.userPrivs.userCanEdit && !this.props.volatile.isEditing && !this.props.editLocked && !this.props.removed ?
        <button data-id={this.props.id} onClick={this.props.handlers.onEnableEdit} className="edit-control" type="button">
          <span className="icon ion ion-edit"/>
        </button> :
        ''
      }
      {this.props.userPrivs.userCanDelete && !this.props.volatile.isEditing && !this.props.editLocked && !this.props.removed ?
        <button data-id={this.props.id} onClick={this.props.handlers.onDelete} className="edit-control" type="button">
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
      {!this.props.removed && !this.props.isOwner ?
        <FlagMenu
          onFlagSave = {this.props.handlers.onFlagSave}
          contextId  = {this.props.id}
          userFlags  = {this.props.userFlags}/>
        : ''}
    </div>
    )
  };
  displayComment = () => {
    return (
      <div>
        <span>{this.props.message}</span>
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
      <div>
        {this.props.volatile.isEditing ? this.commentEditForm() : this.displayComment()}
      </div>
    );
  }

}

class CommentFooter extends Component {

  render () {
    return (
      <footer className="comment-footer">
        <div className="vote-section">
          <button
            disabled={this.props.volatile.lockVote}
            data-id={this.props.id}
            onClick={this.props.handlers.onVoteUp}
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
          <button className="edit-control"><span className="icon ion-share"/></button>
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
    return (
      <div
        id={"comment-" + this.props.id}
        className={this.props.removed ? "comment deleted" : "comment"}>

        <CommentHeading {...this.props}/>
        <CommentBody    {...this.props}/>
        <CommentFooter  {...this.props}/>

      </div>
    )
  }
}
