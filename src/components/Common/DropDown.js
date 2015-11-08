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
      let iconClass = "glyphicon glyphicon-" + opt.icon;
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
      <div style={{backgroundColor: "inherit", color: "inherit"}} className={"btn-group" + (this.state.expanded ? " open" : "")}>
        <button style={{backgroundColor: "inherit", color: "white"}} className="nav nav-btn btn-link dropdown-toggle" onClick={this.toggle}>
          {this.props.title} <span className="caret"/>
        </button>
        <ul className="dropdown-menu">
          {options}
        </ul>
      </div>
    );
  }
}
