import React, {Component} from 'react';
import ajax from 'superagent';
import {TextInput, LinkPreview, Glyph} from './index';

const pattern = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;


export default class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      linkMeta: false,
      status: {
        message: '',
        icon: 'info',
        className: 'info'
      }
    };
    this.scrapeUrl = (url) => {
      ajax.post('/_api/scrape/', {url}, (err, res) => {
        if (err) {
          this.setState({status: {
            message: 'Invalid Url! Please start with http:// or https://',
            icon: 'warning-sign',
            className: 'alert alert-danger'
          }});
        } else {
          this.setState({linkMeta: res.body});
        }
      });
    };
    this._onChange = (e) => {
      var
        url = e.target.value,
        isValidUrl = function() {
          return pattern.test(url);
        }();

      this.setState({value: url});

      if (isValidUrl) {
        this.scrapeUrl(url);
      }
    };
  }

  render () {
    return (
      <div className="link-input">
        {this.state.linkMeta ? <LinkPreview {...this.state.linkMeta} /> : ''}

        <aside>
          {this.state.status.message}
        </aside>


        <TextInput
            {...this.props}
            type="url"
            _onChange={this._onChange}
            value={this.state.value}
            />
      </div>
    )
  }
}
