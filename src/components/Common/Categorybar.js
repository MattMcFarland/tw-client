import React, { Component } from 'react';
class Categorybar extends Component {
  render() {
    return (
      <div className="categories">
        <div className="row">
          <div className="col-lg-9 col-lg-offset-2">
            <ul className="categories__list">
              <li className="categories__list__item">
                <a className="categories__link" href="!#">Webdesign</a>
              </li>
              <li className="categories__list__item">
                <a className="categories__link" href="!#">Webdesign</a>
              </li>

              <li className="categories__list__item">
                <a className="categories__link" href="!#">Webdesign</a>
              </li>

              <li className="categories__list__item">
                <a className="categories__link" href="!#">Webdesign</a>
              </li>

              <li className="categories__list__item">
                <a className="categories__link" href="!#">Webdesign</a>
              </li>
              <li className="categories__list__item">
                <a className="categories__link categories__link--static" href="!#">All</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Categorybar;
