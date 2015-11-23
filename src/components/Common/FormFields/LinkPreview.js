import React, {Component} from 'react';


export default class LinkPreview extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    thumbnailUrl: React.PropTypes.string
  };

  render () {
    var actionBlock;
    const { embedUrl, title, url, thumbnailUrl, description } = this.props;

    if (embedUrl) {
      actionBlock = (
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item" src={embedUrl} />
        </div>
      );
    } else {
      actionBlock = (
        <div className="embed-responsive embed-responsive-16by9">
          <a href={url}>
            <img className="embed-responsive-item" src={thumbnailUrl ? thumbnailUrl : ''}/>
          </a>
        </div>
      );
    }

    return (
      <section className="link-preview" >
        <header>
          <h3>{title}</h3>
        </header>
        <div className="link-preview-body">
          <div className="link-preview-action">
            {actionBlock}
          </div>
          <div className="link-preview-description">
            <p>{description}</p>
          </div>
        </div>
      </section>
    );
  }
}
