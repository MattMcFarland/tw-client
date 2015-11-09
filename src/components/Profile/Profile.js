import React from 'react';
import moment from 'moment';
import classNames from 'classnames'
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = UserStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.handlers);
    UserStore.listen(this.onChange);
    UserActions.init('json');
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render () {
    var activities = this.state.customData.history.map((item, idx) => {
      return (<tr key={idx}>
        <td>{item.action}</td>
        <td><a href={item.url}>{moment(item.timestamp).fromNow()}</a></td>
      </tr>)
    });
    return (
      <div>
        <h2>{this.state.fullName}</h2>
        <p>This is a basic user profile page...</p>
        <hr/>
        <h3>Recent Activity</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {activities}
          </tbody>
        </table>
      </div>
    );
  }

};
