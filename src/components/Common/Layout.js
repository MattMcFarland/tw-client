import React, { Component } from 'react';
import Categorybar from './Categorybar.js';
import Sidebar from './Sidebar.js';
import getCategory from '../../utils/getCategory';
import getTitle from '../../utils/getTitle';

var breadcrumbs = (() => {
  var result;

  let category = getCategory();
  let title = getTitle();

  if (category && category !== 'all') {
    result = [
      {
        path: '/',
        label: 'home'
      },
      {
        path: '/category/' + category,
        label: category
      }
    ]
  } else return [];

  if (title) {
    result.push({
      path: '',
      label: title
    })
  }
  return result;
})();

const Breadcrumbs = () => (
  <ul className="breadcrumbs">
    {breadcrumbs.map((link, i) => {
      return (
        <li key={i}>
          {i !== breadcrumbs.length -1 ? <a href={link.path}>{link.label}</a> : <span>{link.label}</span>}
        </li>
      );
    })}
  </ul>
);

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Categorybar/>
        <div className="breadcrumb-container">
          <div className="content cf">
            {breadcrumbs && breadcrumbs.length > 1 ? <Breadcrumbs/> : '' }
          </div>
        </div>
      </div>
    )
  }
}

export default Layout;
