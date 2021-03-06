import React from 'react';
import marked from 'marked';
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
export default class MarkedArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreview: props.isPreview ? props.isPreview : false
    }
  }
  static styleguide = {
    // Component to use for generating additional examples
    exampleComponent: MarkedArea,
    category: "elements",
    title: "MarkedArea"
  };

  static displayName = 'MarkedArea';

  static propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    classNames: React.PropTypes.object,
    onChange: React.PropTypes.func,
    mode: React.PropTypes.string
  };

  static defaultProps = {
    id: "mmc-marked-area",
    label: "",
    mode: "tabbed",
    value: "",
    classNames: {
      root: "marked-area",
      header: "marked-area-header",
      activeButton: "marked-area-button active",
      defaultButton: "marked-area-button",
      helpLink: "marked-area-help-link",
      textContainer: "marked-area-text-container",
      liveDivider: "marked-area-live-divider"
    }
  };

  get parsed () {
    return (
      <div dangerouslySetInnerHTML={{__html: marked(this.props.value.toString(), {sanitize: true}) }} />
    );
  }
  get raw () {
    return (
      <textarea value={this.props.value} className={(this.props.error ? 'has-error' : '') + ' text-input-field'} {...this.props} id={this.props.id} onChange={this.props.onChange} />
    );
  }
  get tabbedToolbar () {
    return (
      <menu>
        <button
          type="button"
          className={this.state.isPreview ? this.props.classNames.defaultButton : this.props.classNames.activeButton }
          onClick={this.disablePreview}
          >
          <span>Edit</span>
        </button>
        <button
          type="button"
          className={this.state.isPreview ? this.props.classNames.activeButton : this.props.classNames.defaultButton }
          onClick={this.enablePreview}
          >
          <span>Preview</span>
        </button>
        <a
          target="_blank"
          href="//help.github.com/articles/github-flavored-markdown/"
          title="learn more about github flavored markdown"
          className={this.props.classNames.helpLink}
          >
          <span>Help&nbsp;<span className="icon ion-android-open"></span></span>
        </a>
      </menu>
    );
  }
  get tabbedMode () {
    return (
      <section>
        <header className={this.props.classNames.header}>

          {this.tabbedToolbar}
        </header>
        <div className={this.props.classNames.textContainer}>
          {this.state.isPreview ? this.parsed : this.raw}
        </div>
      </section>
    );
  }
  get liveMode () {
    return (
      <section>
        <header className={this.props.classNames.header}>
          <label htmlFor={this.props.id}>{this.props.label}</label>
        </header>
        <div className={this.props.classNames.textContainer}>
          {this.raw}
          <h5 className={this.props.classNames.liveDivider}>Preview:</h5>
          {this.parsed}
        </div>
      </section>
    );
  }
  disablePreview = (e) => {
    e.preventDefault();
    this.setState({isPreview:false});
  };
  enablePreview = (e) => {
    e.preventDefault();
    this.setState({isPreview:true});
  };

  render () {
    console.log(this.props.value);
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
          <div className={this.props.classNames.root}>
            {this.props.mode === "live" ? this.liveMode : this.tabbedMode}
            {this.props.children}
          </div>
      </div>
    )
  }
}
