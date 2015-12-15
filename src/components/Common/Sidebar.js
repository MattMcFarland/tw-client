import React, { Component } from 'react';
import ShareWidget from './ShareWidget';
import ActivityStream from './ActivityStream';

class Sidebar extends Component {

  componentDidMount () {
    this.refs.sidebar.style.height = document.body.scrollHeight + 'px';

  }

  componentDidUpdate () {
    this.refs.sidebar.style.height = document.body.scrollHeight + 'px';
  }

  render() {
    return (
      <aside id="sidebar" ref="sidebar" className="sidebar">
        <section className="content">
          <ShareWidget />
          <ActivityStream />
        </section>
      </aside>
    )
  }
}

export default Sidebar;
