import React from 'react';

class Tabs extends React.Component {

  render () {

    const {activeTab, onFilter} = this.props;

    return (
      <div className="tabs">
        <ul className="tab-list">
          <li>
            <button className={activeTab === "latest" ? 'active' : ''} data-filter="latest" onClick={onFilter}>Latest</button>
          </li>
          <li>
            <button className={activeTab === "wanted" ? 'active' : ''} data-filter="wanted" onClick={onFilter}>Most Wanted</button>
          </li>
          <li>
            <button className={activeTab === "best" ? 'active' : ''} data-filter="best" onClick={onFilter}>Best Tutorials</button>
          </li>
          <li>
            <a className="tutorial-request-link" href="/tutorial-request"><span className="icon ion-bonfire"/>&nbsp;Request Tutorial</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Tabs;
