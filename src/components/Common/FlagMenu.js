import React from 'react';

export default class FlagMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      userFlags: props.userFlags
    };
  }
  static displayName = "FlagMenu";
  static propTypes = {
    onChange: React.PropTypes.func
  };
  static defaultProps = {
    userFlags: [
      { "key": "spam", "value": false },
      { "key": "offensive", "value": false },
      { "key": "duplicate", "value": false },
      { "key": "vague", "value": false }
    ],
    onFlagSave: (e, flags) => {
      console.error('Flag (id: ' + e.currentTarget.dataset.id + ') no function handler for onFlagSave', e.currentTarget);
    }
  };
  toggle = () => {
    this.setState({expanded: !this.state.expanded});
  };
  toggleFlag = (e) => {
    var flagType = e.currentTarget.dataset.key;
    var flags = this.state.userFlags.map((flag) => {
      return {
        key: flag.key,
        value: (flag.key === flagType ? !flag.value : flag.value)
      }
    });
    this.setState({userFlags: flags, expanded: false});
    this.props.onFlagSave(e, flags);
  };
  render ()  {
    var enabledFlags = this.state.userFlags.map((flag) => {
      if (flag.value) {
        return (
          <button data-id={this.props.contextId} key={'enabled_' + flag.key} data-key={flag.key} onClick={this.toggleFlag} className="btn btn-danger btn-xs">
            <span className="label label-danger">x</span>
            <span>&nbsp;</span>
            <span>{flag.key}</span>
          </button>
        )
      }
    });
    var flags = this.state.userFlags.map((flag) => {
      return (
        <li key={'flag_' + flag.key}><button data-id={this.props.contextId} className="btn btn-link" data-key={flag.key} onClick={this.toggleFlag}>
          <span>{(flag.value ? "Remove flag:" : "Flag as")}</span>
          <span>&nbsp;{flag.key}</span>
        </button></li>
      )
    });
    return (
      <div style={{color: "inherit"}}className={"btn-group" + (this.state.expanded ? " open" : "")}>
        {enabledFlags}
        <button data-id={this.props.contextId} style={{color: "inherit"}}className="btn btn-link dropdown-toggle" onClick={this.toggle}>
          <span className="glyphicon glyphicon-flag"/>&nbsp;
          {this.props.children}
        </button>
        <ul className="dropdown-menu">
          {flags}
        </ul>
      </div>
    );
  }
}
