import React from 'react';
import moment from 'moment';

export default class Comment extends React.Component {

  editTime = () => {
    return moment(this.props.updated_at).fromNow();
  }

  createTime = () => {
    return moment(this.props.created_at).fromNow();
  }


  render () {
    return (
      <section>
        <menu className="inline-vote">
          <button
            disabled={this.props.lockVote}
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
        <span>{this.props.message}</span>
        <span>&nbsp;-</span>
        <a href={this.props.editorUrl ? this.props.editorUrl : this.props.authorUrl}>
          <span className="user">{this.props.editorName ? this.props.editorName : this.props.authorName}</span>
        </a>
        {this.props.editorName ? <sup>Editor</sup> : ''}
        <em><span> on </span><span>{this.props.editorName ? this.editTime() : this.createTime() }</span></em>
        <div className="btn-group">
          <button className="btn btn-link dropdown-toggle">
            <span className="glyphicon glyphicon-flag"></span>
            <span>&nbsp;</span>
          </button>
          <ul className="dropdown-menu">
            <li><button className="btn btn-link">Flag as spam</button></li>
          </ul>
        </div>
      </section>
    )
  }
}
