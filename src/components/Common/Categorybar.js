import React, { Component } from 'react';
import getCategory from '../../utils/getCategory';

let pathCategory = getCategory();

let categories = [
  {
    id: 'apps',
    label: 'Apps'
  },
  {
    id: 'gaming',
    label: 'Gaming'
  },
  {
    id: 'gamedev',
    label: 'Game Development'
  },
  {
    id: 'webdev',
    label: 'Web Development'
  },
  {
    id: 'all',
    label: 'All'
  }
]


class Categorybar extends Component {
  render() {
    let current = this.props.category ? this.props.category : pathCategory;
    return (
      <header className="categorybar">
        <div className="content cf">
          <ul>
            {categories.map(cat =>
              <li key={cat.id} className={cat.id === current ? 'static' : ''}>
                <a className={cat.id === current ? 'static' : ''} href={"/category/" + cat.id}>
                  {cat.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      </header>
    )
  }
}

export default Categorybar;
