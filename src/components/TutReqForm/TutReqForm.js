/**
 * Created by mmcfarland on 11/1/15.
 */
import React from 'react';
import Select from 'react-select';
import ajax from 'superagent';
import { TextInput, MarkedArea } from '../Common/FormFields';
import xss from 'xss';
import Spinner from '../../components/Common/Spinner';

export default class TutReqForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formTitle: '',
      error: {},
      submitting: false
    };
  }
  componentDidUpdate() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.height = document.body.scrollHeight + 'px';
  }
  onTitleChange = (e) => {
    this.setState({formTitle: e.currentTarget.value})
  }
  validateTags = (values) => {
    return (values.length > 1 && values.length < 5)
  }
  validateContent = (value) => {
    return (value.length > 30)
  }
  validateTitle = (value) => {
    return (value.length > 10)
  }

  validate = () => {
    var
      errors = [],
      tags = this.refs.tags.state.values,
      title = this.state.formTitle,
      content = this.refs.content.state.value,
      rules = [
        {
          el: 'tags',
          failOn: tags.length < 1,
          error: 'You must select at least one tag.'
        },
        {
          el: 'tags',
          failOn: tags.length > 4,
          error: 'You may not select more than 4 tags.'
        },
        {
          el: 'title',
          failOn: title.length < 10,
          error: 'Title is not long enough and must be at least 10 characters in length.'
        },
        {
          el: 'title',
          failOn: title.length > 80,
          error: 'Title is too long and must not exceed 80 characters..'
        },
        {
          el: 'content',
          failOn: content.length < 30,
          error: 'Request content is not long enough and must be 30 characters in length.'
        },
        {
          el: 'content',
          failOn: content.length > 2400,
          error: 'Request content is too long may not exceed 2400 characters in length.'
        }
      ];


    rules.forEach((rule, index) => {

      if (rule.failOn) {
        errors.push(rule);
      }
    });

    if (errors.length) {
      return {
        errors: errors,
        valid: false
      };
    } else {
      return {
        errors: null,
        valid: true
      }
    }


  }

  onSubmit = (e) => {
    e.preventDefault();


    var valid = this.validate();

    if (valid.errors) {

      let article = valid.errors.length > 1 ? 'are' : 'is';
      let noun = valid.errors.length > 1 ? 'errors' : 'error';
      let count = valid.errors.length > 1 ? valid.errors.length : 'one';

      this.setState({
        error: {
          message: `There ${article} ${count} ${noun} in your tutorial request, please try again.`,
          data: valid.errors
        }
      })

      return false;

    } else {
      this.setState({submitting: true});
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
            this.setState({submitting: false, error: 'An unknown error occurred, please try again.'});
          } else if (res) {
            window.location.href = window.location = "/tutorial-request/" + res.body.permalink;
          }
        })
    }


  }

  render() {

    var tagError, titleError, contentError;

    // key could be tags title and/or content
    if (this.state.error && this.state.error.data) {
      let data = this.state.error.data;
      data.forEach((err) => {
        console.log(err);
        if (err.el === "tags") {
          tagError = err.error;
        } else if (err.el === "title") {
          titleError = err.error;
        } else if (err.el === "content") {
          contentError = err.error;
        }
      })
    }

    return (
      <form style={{
      position: 'relative',
      opacity: this.state.submitting ? 0.5 : 1
      }}>
        <h2><span className="icon ion-bonfire"/>Tutorial Request</h2>
        {titleError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{titleError}</aside> : ''}
        <TextInput
          error={titleError ? true : false}
          ref="title"
          label="In a few words, what kind of tutorial are you looking for?"
          id="title"
          _onChange={this.onTitleChange}
          value={this.state.formTitle}
          required="true"
          minLength="10"
        />
        {contentError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{contentError}</aside> : ''}
        <MarkedArea
          error={contentError ? true : false}
          ref="content"
          label="Please explain, (the more detail, the better!)"
          id="content"
          tip="You can use Github flavored markdown to dress up your request."
          required="true"
          minLength="24"
        />
        {tagError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{tagError}</aside> : ''}
        <label className={tagError ? 'error' : ''}>
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
        {this.state.error ? <aside className="error-box">{this.state.error.message}</aside> : ''}
        {this.state.submitting ? <Spinner top="50%"/>
           :
          <input className="btn btn-primary" type="submit" onClick={this.onSubmit} value="Submit Request"/>
        }
      </form>
    )
  }
}
