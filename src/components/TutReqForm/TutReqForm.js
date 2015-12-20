/**
 * Created by mmcfarland on 11/1/15.
 */
import React from 'react';
import Select from '../Common/Select';
import ajax from 'superagent';
import { TextInput, MarkedArea } from '../Common/FormFields';
import xss from 'xss';
import Spinner from '../../components/Common/Spinner';

export default class TutReqForm extends React.Component {

  constructor(props) {
    super(props);
    var form = {}
    try {
      form = JSON.parse(localStorage.getItem('form'));
    } catch (e) {
      form = {}
    }

    this.state = {
      error: {},
      submitting: false,
      form
    };
  }

  updateForm = (key, value) => {
    console.log('update form', key, 'to', value);
    var addtoForm = {};
    addtoForm[key] = value;
    var form = Object.assign(
      {},
      this.state.form,
      addtoForm
    );
    console.log('new form object', form);

    this.setState({form});
    this.updateStorage();
  };
  updateStorage = () => {
    localStorage.setItem('form', JSON.stringify(this.state.form));
  };
  onTitleChange = (e) => {
    this.updateForm('title', e.target.value);
  }
  onContentChange = (e) => {
    this.updateForm('content', e.target.value);
  }
  onCategoryChange = (e) => {
    this.updateForm('category', e.target.value);
  }
  onTagChange = (value, values) => {
    this.updateForm('tags', values);
  }

  validate = () => {
    var
      errors = [],
      tags = this.state.form.tags,
      title = this.state.form.title,
      content = this.state.form.content.trim(),
      category = this.state.form.category.trim(),
      rules = [
        {
          el: 'category',
          failOn: category === '',
          error: 'You must select a category.'
        },
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
          title: xss(this.state.form.title),
          content: xss(this.state.form.content),
          tags: xss(this.state.form.tags),
          category: xss(this.state.form.category)
        })
        .end((err, res) => {
          if (err && res.status === 403) {
            window.location.href = window.location = "/login?next=" + window.location.pathname;
          } else if (err) {
            this.setState({submitting: false, error: 'An unknown error occurred, please try again.'});
          } else if (res) {
            localStorage.removeItem('form');
            window.location.href = window.location = "/tutorial-request/" + res.body.permalink;
          }
        })
    }


  }

  render() {

    var tagError, titleError, contentError, categoryError;

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
        } else if (err.el === "category") {
          categoryError = err.error;
        }
      })
    }
    if (!this.state.form) {
      this.state.form = {};
    }
    let { category, tags, content, title } = this.state.form;
    return (
      <form style={{
      position: 'relative',
      opacity: this.state.submitting ? 0.5 : 1
      }}>
        <h2><span className="icon ion-bonfire"/>Tutorial Request</h2>
        {categoryError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{categoryError}</aside> : ''}
        <select ref="category" onChange={this.onCategoryChange} value={category}>
          <option value="">category</option>
          <option value="apps">Apps</option>
          <option value="gaming">Gaming</option>
          <option value="gamedev">Game Development</option>
          <option value="webdev">Web Development</option>
        </select>
        {titleError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{titleError}</aside> : ''}
        <TextInput
          error={titleError ? true : false}
          ref="title"
          label="In a few words, what kind of tutorial are you looking for?"
          id="title"
          _onChange={this.onTitleChange}
          value={title}
          required="true"
          minLength="10"
        />
        {contentError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{contentError}</aside> : ''}
        <MarkedArea
          value={content}
          error={contentError ? true : false}
          ref="content"
          label="Please explain, (the more detail, the better!)"
          id="content"
          tip="You can use Github flavored markdown to dress up your request."
          required="true"
          minLength="24"
          onChange={this.onContentChange}
        />
        {tagError ? <aside className="error"><span className="ion-alert-circled"/>&nbsp;{tagError}</aside> : ''}
        <label className={tagError ? 'error' : ''}>
          <span className="form-label">Tags:</span>
          <em className="form-field-tip">Select between one and four tags.</em>
          <br/>
          <Select
            value={tags}
            ref="tags"
            id="tagbox"
            onChange={this.onTagChange}
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
