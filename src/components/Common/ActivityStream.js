import React from 'react';
import Widget from './Widget';
import moment from 'moment';

/*
<ul>
  <li><span className="icon ion-chevron-down down"></span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus dapibus urna quis posuere. </p></li>
  <li><span className="icon ion-ios-chatboxes-outline blue"></span><p>Phasellus pulvinar magna a massa maximus imperdiet. Sed sed sagittis eros, vel cursus neque. In sodales ipsum id turpis viverra, et venenatis diam tincidunt.</p></li>
  <li><span className="icon ion-chevron-up up"></span><p>Maecenas justo odio, tempus sed velit sed, mattis fermentum lorem. Sed placerat nisi vitae ante blandit, et volutpat massa cursus. </p></li>
  <li><span className="icon ion-document blue"></span><p>onec nunc ipsum, laoreet non velit non, lobortis pellentesque felis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam ultricies neque eu arcu tincidunt, eu venenatis orci cursus.</p></li>
</ul>
*/

const actvityStream = (state = [], action) => {
  var length = (state.activities && state.activities.length ? state.activities.length : 0);
  switch(action.type) {
    case "ADD_ACTIVITY":
      if (length < 20) {
        return Object.assign({}, state, {
          activities: [
            {
              ...action.data
            },
            ...state.activities
          ]
        })
      } else {

        return Object.assign({}, state, {
          activities: [
            {
              ...action.data
            },
            ...state.activities.slice(0, 19)
          ]
        })
      }
      break;
    default:
      return state;
      break;
  }
};

const getIcon = (action, user) => {
  switch (action) {
    case "voteUp":
      return (<a data-tipsy={user + ' voted up...'} className="tipsy tipsy--w"><span className="icon ion-chevron-up up"/></a>);
      break;
    case "undoVoteUp":
      return (<a data-tipsy={user + ' took back their vote...'} className="tipsy tipsy--w"><span className="icon ion-chevron-up down"/></a>);
      break;
    case "voteDown":
      return (<a data-tipsy={user + ' voted down...'} className="tipsy tipsy--w"><span className="icon ion-chevron-down down"/></a>);
      break;
    case "undoVoteDown":
      return (<a data-tipsy={user + ' took back their vote...'} className="tipsy tipsy--w"><span className="icon ion-chevron-down up"/></a>);
      break;
    case "addCommentToTutorialRequest":
      return (<a data-tipsy={user + ' commented on a request.'} className="tipsy tipsy--w"><span className="icon ion-ios-chatboxes-outline"/></a>);
      break;
    case "addCommentToTutorialSolution":
      return (<a data-tipsy={user + ' commented on a tutorial.'} className="tipsy tipsy--w"><span className="icon ion-ios-chatboxes-outline"/></a>);
      break;
    case "addSolution":
      return (<a data-tipsy={user + ' posted a tutorial.'} className="tipsy tipsy--w"><span className="icon ion-document up"/></a>);
      break;
    default:
      return (<a data-tipsy={user + ' posted...'} className="tipsy tipsy--w"><span className="icon ion-document blue"/></a>);
      break;
  }
}

export default class ActivityStream extends React.Component {
  constructor (props) {
    super(props);
    if (localStorage.activities) {
      this.state = {
        activities: JSON.parse(localStorage.activities)
      }
    } else {
      this.state = {
        activities: []
      }
    }
  }

  componentDidMount () {
    window.socket.on('action', (data) => {
      var newState = actvityStream(this.state, {type: 'ADD_ACTIVITY', data});
      console.log('newState', newState);
      localStorage.activities = JSON.stringify(newState.activities);
      this.setState(newState);
    })
  }

  render () {
    return (
    <div>
      <Widget title="Activity Stream" icon="ion-ios-pulse-strong" addClass="activity-stream">
        <ul>
          {this.state.activities.map((activity, index) => (
            <li key={index}>
              {getIcon(activity.action, activity.user)}
              <p>{activity.excerpt}</p>
              <footer>
                <span>{activity.user}</span>
                <a href={activity.href}>{moment(activity.timestamp).fromNow()}</a>
              </footer>
            </li>
          ))}
        </ul>
      </Widget>
    </div>
    );
  }
}
