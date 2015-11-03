import React, {Component} from 'react';

export default class LinkPreview extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    embedUrl: React.PropTypes.url,
    url: React.PropTypes.string,
    thumbnailUrl: React.PropTypes.string
  };

  render () {
    var actionBlock;
    const { embedUrl, title, url, thumbnailUrl, description } = this.props;

    if (embedUrl) {
      actionBlock = (
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={embedUrl}/>
        </div>
      );
    } else {
      actionBlock = (
        <a href={url}>
          <img src={thumbnailUrl}/>
        </a>
      );
    }

    return (
      <section className="panel panel-success">
        <header className="panel-heading">
          <h3>{title}</h3>
        </header>
        <div className="panel-body row">
          <div className="col-sm-4">
            {actionBlock}
          </div>
          <div className="col-sm-8">
            <p>{description}</p>
          </div>
        </div>
      </section>
    );
  }
}
