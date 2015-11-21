import React, { Component } from 'react';
import ShareWidget from './ShareWidget';
import ActivityStream from './ActivityStream';

class Sidebar extends Component {

  componentDidMount () {
    this.refs.sidebar.style.height = window.innerHeight;
  }

  componentDidUpdate () {
    this.refs.sidebar.style.height = window.innerHeight;
  }

  render() {
    return (
      <aside ref="sidebar" className="sidebar">
        <section className="content">
          <ShareWidget />
          <ActivityStream />
        </section>
      </aside>
    )
  }
}

export default Sidebar;
