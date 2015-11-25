import React from 'react';
import moment from 'moment';




export default class ListItem extends React.Component {

  render () {
    var tags = this.props.tags.map((tag, index) => {
      return (
        <li key={index}
            className={tag.is_pending ? "pending tag" : "approved tag"}
            title={tag.is_pending ? "This tag is pending approval by moderators and may be removed" : "Tutorial request tagged with" + tag.name}
          >{tag.name}</li>
      );
    })

    return (
      <section className="tut-request-item">
        <div className="content">
          <div className="vote-cell">
            <div className="vote">
              <button className="up">
                <span className="icon ion-chevron-up"></span>
              </button>
              <span className="score">{this.props.score}</span>
              <button className="down">
                <span className="icon ion-chevron-down"></span>
              </button>
            </div>
          </div>
          <div className="content-cell">
            <section className="title">
              <p><a href={"/tutorial-request/" + this.props.permalink}>{this.props.title}</a></p>
            </section>
            <section className="meta">
              <div className="user">
                <div className="body">
                  <div className="avatar-container"><img className="avatar" src="http://lorempixel.com/128/128/people" alt="Avatar" /></div>
                  <div className="meta">
                    <div className="user-name"><a href={this.props.authorUrl}>{this.props.authorName}</a></div>
                    <div className="timestamp"><a href={"/tutorial-request/" + this.props.permalink}>{moment(this.props.created_at).fromNow()}</a></div>
                  </div>
                </div>
              </div>
            </section>
            <ul className="tags">
              {tags}
            </ul>
          </div>
        </div>
        <div className="divider">
        </div>
        <div className="response-count">
          <a href={"/tutorial-request/" + this.props.permalink} className="btn btn-primary">
            <span className="icon ion-chatboxes"></span>&nbsp; <span>{this.props.solutions.length} Tutorials</span>
          </a>
        </div>
      </section>
    );
  }
}
