import React, {Component} from 'react';
import ajax from 'superagent';
import {TextInput, LinkPreview, Glyph} from './index';

function validateUrl(value){
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}

export default class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      linkMeta: false,
      scraping: false,
      status: {
        message: '',
        icon: 'info',
        className: 'info'
      }
    };
    this.scrapeUrl = (url) => {
      this.setState({linkMeta: null, scraping: true});

      ajax.post('/_api/scrape/', {url}, (err, res) => {
        if (!err && res) {
          this.setState({linkMeta: res.body, scraping: false});
        }
      });
    };
    this._onChange = (e) => {
      var
        url = e.target.value,
        isValidUrl = validateUrl(url);

      this.setState({value: url});

      if (isValidUrl) {
        this.scrapeUrl(url);
      }
    };
  }

  render () {

    var linkPreview;

    if (this.state.linkMeta) {
      linkPreview = (<LinkPreview scraping={false} {...this.state.linkMeta}  />);
    } else if (this.state.scraping) {
      linkPreview = (<LinkPreview scraping={true} />);
    }

    return (
      <div className="link-input">
        {linkPreview ? linkPreview : ''}

        <aside>
          {this.state.status.message}
        </aside>


        <TextInput
            {...this.props}
            className={(this.props.error ? 'error' : '') + ' text-input-field'}
            type="url"
            _onChange={this._onChange}
            value={this.state.value}
            />
      </div>
    )
  }
}
