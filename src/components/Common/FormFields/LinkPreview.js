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
    let { embedUrl, title, url, thumbnailUrl, description } = this.props;

    if (this.props.scraping) {
      title="loading";
      thumbnailUrl="/img/loading.gif";
      description="Scraping......";
    } else if (!title || !description) {
        thumbnailUrl="/img/scrape-error-m.png";
        description="Sorry, we are not able to process this url, please try again later or contact us if this persists."
        title="Parse error :("

    }

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
