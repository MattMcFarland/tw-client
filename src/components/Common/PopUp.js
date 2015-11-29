import React, { Component } from 'react';
import classNames from 'classnames';


export default class PopUp extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      expanded: false
    };

    this.baseClass = classNames(
      'popup',
      {
        up: props.direction === 'up',
        down: props.direction === 'down',
        left: props.direction === 'left',
        right: props.direction === 'right'
      }
    )
  };

  static displayName = "PopUp";

  toggle = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render () {
    return (
      <div className={this.baseClass + (this.state.expanded ? " open" : "")}>
        <button style={{lineHeight: '1.125'}} data-tipsy={this.props.tooltip} className={'tipsy ' + this.props.tooltipClass} onClick={this.toggle}>
          <span className={"icon ion-" + this.props.icon}/>
          {this.props.title ? this.props.title : ''}
        </button>
        <aside className="popup-body">
          {this.props.children}
        </aside>
      </div>
    );
  }
}
