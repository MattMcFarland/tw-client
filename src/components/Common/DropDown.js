import React from 'react';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  static displayName = "DropDown";

  toggle = () => {
    this.setState({expanded: !this.state.expanded});
  };
  render ()  {
    var options = this.props.options.map((opt, idx) => {
      opt.icon || (opt.icon = "minus");
      let iconClass = "icon ion ion-" + opt.icon;
      let action = opt.type === "link" ?
        (<a href={opt.href}><span className={iconClass}/>{opt.title}</a>) :
        (<button onClick={opt.onClick}><span className={iconClass}/>{opt.title}</button>);
      return (
        <li key={idx}>
          {action}
        </li>
      );
    });
    return (
      <div className={"dropdown" + (this.state.expanded ? " open" : "")}>
        <button onClick={this.toggle}>
          {this.props.title} <span className="icon ion-android-arrow-dropdown"/>
        </button>
        <ul className="dropdown-items">
          {options}
        </ul>
      </div>
    );
  }
}
