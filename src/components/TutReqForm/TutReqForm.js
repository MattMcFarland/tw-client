/**
 * Created by mmcfarland on 11/1/15.
 */
import React from 'react';
import Select from 'react-select';
import ajax from 'superagent';
import { TextInput, MarkedArea } from '../Common/FormFields';

export default class TutReqForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        formTitle: ''
      };
    }

    onTitleChange = (e) => {
      this.setState({formTitle: e.currentTarget.value})
    }

    // TODO: Add Form Validation
    onSubmit = (e) => {
      e.preventDefault();
      this.setState({submitting: true});
      ajax.post('/api/tutorial-requests')
        .send({
          title: this.state.formTitle,
          content: this.refs.content.state.value,
          tags: this.refs.tags.state.value
        })
        .end((err, res) => {
          if (err && res.status === 403) {
            window.location.href = window.location = "/login?next=" + window.location.pathname;
          } else if (err) {
            this.setState({error: err});
          } else if (res) {
            window.location.href = window.location = "/tutorial-request/" + res.body.permalink;
          }
        })
    }

    render() {
        return (
          <form>
            <TextInput
              ref="title"
              label="In a few words, what kind of tutorial are you looking for?"
              id="title"
              _onChange={this.onTitleChange}
              value={this.state.formTitle}
              />
            <MarkedArea
              ref="content"
              label="Please explain, (the more detail, the better!)"
              id="content"
              tip="You can use Github flavored markdown to dress up your request."
              />
            <label className="text-input">
              <span className="form-label">Tags:</span>
              <em className="form-field-tip">Select between one and four tags.</em>
              <br/>
              <Select
                ref="tags"
                id="tagbox"
                allowCreate={true}
                multi={true}
                />
            </label>
            <br/>
            {this.state.error ? 'oh knowes an error ocurred' : ''}
            {this.state.submitting ?
              <img src="/img/loading.gif" /> :
              <input className="btn btn-success btn-lg" type="submit" onClick={this.onSubmit} value="submit"/>
            }
          </form>
        )
    }
}
