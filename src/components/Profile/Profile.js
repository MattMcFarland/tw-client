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
  componentDidUpdate() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.height = document.body.scrollHeight + 'px';
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

  renderOccupation = () => {
    return (
      <span>{this.state.customData.occupation}</span>
    );
  }

  renderFrom = () => {
    return (
      <span>
        <span>&nbsp;from&nbsp;</span>
        <span>{this.state.customData.location}</span>
      </span>
    )
  }

  renderBio = () => {
    return (
      <section>
        <h3>Bio</h3>
        <p>{this.state.customData.bio}</p>
        <hr/>
      </section>
    );
  }

  renderLinks = () => {
    var linkList = this.state.customData.links.map((link, idx) => {
      return (
        <div key={idx}>
          <dt>{link.name}</dt>
          <dd><a href={link.url}>{link.url}</a></dd>
        </div>
      );
    })
    return (
      <section>
        <h3>Links</h3>
        <dl>
          {linkList}
        </dl>
        <hr/>
      </section>
    );
  };
  renderHistory = () => {
    var activities = this.state.customData.history.map((item, idx) => {
      return (<tr key={idx}>
        <td>{item.action}</td>
        <td><a href={item.url}>{moment(item.timestamp).fromNow()}</a></td>
      </tr>)
    });

    return (
      <section>
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
      </section>
    );
  }
  render () {

    return (
      <section>
        <header>
          <h2>{this.state.fullName}</h2>
          <em>
            {this.state.customData.occupation ? this.renderOccupation() : ''}
            {this.state.customData.location ? this.renderFrom() : ''}
          </em>
          <hr/>
        </header>

        {this.state.customData.bio ? this.renderBio() : ''}
        {this.state.customData.links ? this.renderLinks() : ''}
        {this.state.customData.history ? this.renderHistory() : ''}

      </section>
    );
  }

};
