import React, {Component} from 'react';
import {TextInput, LinkInput, MarkedArea } from '../Common/FormFields';

const pattern = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

export default class TutSolForm extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static displayName='TutSolForm';


  validate = () => {
    var
      errors = [],
      urlInput = this.refs.url.state.value,
      content = this.refs.content.state.value,
      linkMeta = this.refs.url.state.linkMeta,
      rules = [
        {
          el: 'url',
          failOn: urlInput.length < 11,
          error: 'URL must be at least 10 characters in length.'
        },
        {
          el: 'url',
          failOn: urlInput.length > 64,
          error: 'URL amy not exceed 64 characters in length'
        },
        {
          el: 'url',
          failOn: !pattern.test(urlInput),
          error: 'Invalid url, please enter a full domain with protocol prefix included'
        },
        {
          el: 'url',
          failOn: urlInput.indexOf('http') === -1 && urlInput.indexOf('https') === -1,
          error: 'url is missing http:// or https:// prefix'
        },
        {
          el: 'content',
          failOn: content.length < 12,
          error: 'Request content is not long enough and must be 12 characters in length.'
        },
        {
          el: 'url',
          failOn: !linkMeta,
          error: 'Invalid url, please enter a full domain with protocol prefix included'
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
          message: `There ${article} ${count} ${noun} in your tutorial form, please try again.`,
          data: valid.errors
        }
      })

      return false;

    } else {

      var formData = {
        content: this.refs.content.state.value,
        linkMeta: this.refs.url.state.linkMeta
      };
      this.props.onSolutionSubmit(this.props.id, formData)
    }

  };


  render () {
    var urlError, contentError;

    // key could be tags title and/or content
    if (this.state && this.state.error && this.state.error.data) {
      let data = this.state.error.data;
      data.forEach((err) => {
        console.log(err);
        if (err.el === "url") {
          urlError = err.error;
        } else if (err.el === "content") {
          contentError = err.error;
        }
      })
    }

    return (
      <form className="solution-form">
        <fieldset>
          <section>
            <legend>Submit Tutorial</legend>
            <p>Fill out the fields below to share your tutorial request.<br/>Make sure to use http(s) prefix</p>

            {urlError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{urlError}</aside> : ''}
            <LinkInput ref="url" id="url" type="url" placeholder="Enter URL to tutorial" error={urlError ? true : false} />

            {contentError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{contentError}</aside> : ''}
            <MarkedArea
              error={contentError ? true : false}
              ref="content"
              id="content"
              placeholder="Provide a description of your tutorial"
              tip="You can use Github flavored markdown to dress up your request."
            />

          </section>
        </fieldset>
        <footer>
          <section>
            <input className="btn btn-white" type="submit" value="Submit" onClick={this.onSubmit}/>
          </section>
        </footer>
      </form>
    );
  }
}
