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
    let selfEdited = this.props.editorName && this.props.authorName === this.props.editorName;
    let superEdited = this.props.editorName && this.props.authorName !== this.props.editorName;



    return (
      <span className="comment-author">
      <a href={this.props.authorUrl}>
          <span
            className={this.props.isOwner ? 'owner' : ''}>
            {this.props.isOwner ? 'You' : this.props.authorName}</span>
      </a>
    {selfEdited ? <sup className="edit">Edited&nbsp;<span> -</span>{this.editTime()}</sup> : ''}
    {superEdited ? <sup className="edit">Edited by <a href={this.props.editorUrl}>{this.props.editorName}</a><span> -</span>{this.editTime()}</sup> : ''}
    </span>
    )
  };

  render () {

    let { removed, isOwner, editorName, id, userFlags } = this.props;

    return (
      <header>
        <h4>
          {this.renderAuthor()}
          &nbsp;
          {!removed && !isOwner ?
            <FlagMenu
              defaultFlags = {[
                { "key": "spam",      "value": false },
                { "key": "offensive", "value": false }
              ]}
              onFlagSave = {this.props.handlers.onFlagSave}
              contextId  = {id}
              userFlags  = {userFlags}/>
            : ''}

          <span className="timestamp">{editorName ? this.editTime() : this.createTime() }</span>
        </h4>
      </header>
    );
  }
}



class CommentBody extends Component {

  displayEditControls = () => {
    return (
    <div className="edit-controls">
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
