import React from 'react';

export default class FlagMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      userFlags: props.userFlags || props.defaultFlags
    };
  }
  static displayName = "FlagMenu";
  static propTypes = {
    onChange: React.PropTypes.func
  };
  static defaultProps = {
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
            <span>{flag.key}</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span>x</span>
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
      <div className={"dropdown flag" + (this.state.expanded ? " open" : "")}>
        <div className="flag-container">{enabledFlags}</div>
        <button data-id={this.props.contextId} onClick={this.toggle}>
          <span className="icon ion-flag"/>&nbsp;
          {this.props.children}
          <span className="icon ion-android-arrow-dropdown"/>
        </button>
        <ul className="dropdown-items">
          {flags}
        </ul>
      </div>
    );
  }
}
