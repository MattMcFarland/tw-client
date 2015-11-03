var React = require('react');
module.exports = React.createClass({
  displayName: "TextInput",
  propTypes: {
    label: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    _onChange: React.PropTypes.func.isRequired,
    tip: React.PropTypes.string,
    minimum: React.PropTypes.string,
    value: React.PropTypes.string.isRequired
  },
  getDefaultProps: function () {
    return {
      tip: "",
      minimum: "0",
      value: "",
      type: "text"
    };
  },
  render: function () {
    return (
      <label className="text-input">
        <span className="form-label">{this.props.label}</span>
        <em className="form-field-tip">{this.props.tip}</em>
        <input
          min={this.props.minimum}
          type={this.props.type}
          className="text-input-field"
          id={this.props.id}
          value={this.props.value}
          onChange={this.props._onChange}
          style={{width: '100%', height: '36px'}}
          />
      </label>
    );
  }
});
