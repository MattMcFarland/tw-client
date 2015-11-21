/**
 * Created by mmcfarland on 11/1/15.
 */
import React from 'react';
import Select from 'react-select';
import ajax from 'superagent';
import { TextInput, MarkedArea } from '../Common/FormFields';
import xss from 'xss';

export default class TutReqForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formTitle: ''
    };
  }
  componentDidUpdate() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.height = document.body.scrollHeight + 'px';
  }
  onTitleChange = (e) => {
    this.setState({formTitle: e.currentTarget.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({submitting: true});
    // simple (hacky) validation on client
    if (this.state.formTitle.length < 10 ||
      this.refs.content.state.value.length < 10 ||
      this.refs.tags.state.value < 1) {
      this.setState({
        error: 'Please make sure to fill out the entire form, minimum of 10 characters, or at least 1 tag.',
        submitting: false
      })
    } else {
      ajax.post('/api/tutorial-requests')
        .send({
          title: xss(this.state.formTitle),
          content: xss(this.refs.content.state.value),
          tags: xss(this.refs.tags.state.value)
        })
        .end((err, res) => {
          if (err && res.status === 403) {
            window.location.href = window.location = "/login?next=" + window.location.pathname;
          } else if (err) {
            this.setState({submitting: false, error: 'Please make sure to fill out the entire form, minimum of 10 characters, or at least 1 tag.'});
          } else if (res) {
            window.location.href = window.location = "/tutorial-request/" + res.body.permalink;
          }
        })
    }
  }

  render() {
    return (
      <form>
        <h2><span className="icon ion-bonfire"/>Tutorial Request</h2>
        {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : ''}
        <TextInput
          ref="title"
          label="In a few words, what kind of tutorial are you looking for?"
          id="title"
          _onChange={this.onTitleChange}
          value={this.state.formTitle}
          required="true"
          minLength="10"
        />
        <MarkedArea
          ref="content"
          label="Please explain, (the more detail, the better!)"
          id="content"
          tip="You can use Github flavored markdown to dress up your request."
          required="true"
          minLength="10"
        />
        <label>
          <span className="form-label">Tags:</span>
          <em className="form-field-tip">Select between one and four tags.</em>
          <br/>
          <Select
            ref="tags"
            id="tagbox"
            allowCreate={true}
            multi={true}
            required="true"
          />
        </label>
        <br/>
        {this.state.error ? <p>oh knowes an error ocurred</p> : ''}
        {this.state.submitting ?
          <img src="/img/loading.gif" /> :
          <input className="btn btn-primary" type="submit" onClick={this.onSubmit} value="Submit Request"/>
        }
      </form>
    )
  }
}
