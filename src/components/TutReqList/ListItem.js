import React from 'react';
import moment from 'moment';





export const ListItem = (
  props
) => (
  <section className="tut-request-item">
    <div className="content">
      <div className="vote-cell">
        <div className="vote">
          <button
            data-tipsy={props.userVote === 1 ?
             'Remove vote' : 'Vote up'
            }
            className="tipsy tipsy--n up"
            data-id={props.id}
            disabled={props.lockVote}
            onClick={props.onVoteUp}>
            <span
              className={props.userVote === 1 ?
              "icon ion-chevron-up active" :
              "icon ion-chevron-up"}
            />
          </button>
          <span className="score">{props.score}</span>
          <button
            data-tipsy={props.userVote === -1 ?
             'Remove vote' : 'Vote down'
            }
            className="tipsy tipsy--s down"
            data-id={props.id}
            disabled={props.lockVote}
            onClick={props.onVoteDown}>

            <span
              className={props.userVote === -1 ?
              "icon ion-chevron-down active" :
              "icon ion-chevron-down"}
            />
          </button>
        </div>
      </div>
      <div className="content-cell">
        <section className="title">
          <p><a href={"/tutorial-request/" + props.permalink}>{props.title}</a></p>
        </section>
        <section className="meta">
          <div className="user">
            <div className="body">
              {props.authorAvatar ? <div className="avatar-container"><img className="avatar" src={props.authorAvatar} alt="Avatar" /></div> : ''}
              <div className="meta">
                <div className="user-name"><a href={props.authorUrl}>{props.authorName}</a></div>
                <div className="timestamp"><a href={"/tutorial-request/" + props.permalink}>{moment(props.created_at).fromNow()}</a></div>
              </div>
            </div>
          </div>
        </section>
        <a href={"/tutorial-request/" + props.permalink} style={{display: 'block'}}>
          <span>{props.solutions.length} Tutorials</span>
        </a>
        <ul className="tags">
          {props.tags.map((tag, index) =>
          <li key={index}
              className={tag.is_pending ? "pending tag" : "approved tag"}
              title={tag.is_pending ? "This tag is pending approval by moderators and may be removed" : "Tutorial request tagged with" + tag.name}
          >{tag.name}</li>
          )}
        </ul>
      </div>
    </div>
    <div className="divider" style={{margin: '10px 0'}}/>

  </section>
);
