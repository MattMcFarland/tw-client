import React, { Component } from 'react';
import ShareWidget from './ShareWidget';
import ActivityStream from './ActivityStream';

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <section className="content">
          <ShareWidget />
          <ActivityStream />
        </section>
      </aside>
    )
  }
}

export default Sidebar;
