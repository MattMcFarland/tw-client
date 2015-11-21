import React, { Component } from 'react';
class Categorybar extends Component {
  render() {
    return (
      <header className="categorybar">
        <div className="content cf">
          <ul>
            <li><button>Apps</button></li>
            <li><button>Gaming</button></li>
            <li><button>Game Development</button></li>
            <li><button>Web Development</button></li>
            <li className="static"><button className="static">All</button></li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Categorybar;
