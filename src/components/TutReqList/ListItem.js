import React from 'react';
import moment from 'moment';





export const ListItem = (
  props
) => (
  <section className="tut-request-item">
    <table className="listitem-table">
      <tr>
        <td className="listitem-vote">
          <div className="listitem-vote-inner">
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
        </td>
        <td className="listitem-content">
          <div className="listitem-content-inner">
              <p style={{margin: '0', paddingTop: '4px', lineHeight:'1'}}><a href={"/tutorial-request/" + props.permalink}>{props.title}</a></p>
              <a style={{fontSize: '12px', color: '#999'}} href={"/tutorial-request/" + props.permalink}>
                <span>{props.comments.length} Comments</span>
                <span> & </span>
                <span style={{fontSize: '12px', color: '#999'}}>{props.solutions.length} Tutorials</span>
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
        </td>
        <td className="listitem-meta">
          <div className="listitem-meta-inner">
          <div className="user">
            <div className="body">
              <div className="meta">
                <div className="user-name"><a href={props.authorUrl}>{props.authorName}</a></div>
                <div className="timestamp"><span style={{fontSize: '12px', color: '#999'}}><a href={"/tutorial-request/" + props.permalink}>{moment(props.created_at).fromNow()}</a></span></div>
              </div>
            </div>
          </div>
        </div>
        </td>
      </tr>

    </table>
    <div className="divider"/>

  </section>
);
