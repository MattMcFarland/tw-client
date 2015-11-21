import React, {Component} from 'react';
import {TextInput, LinkInput, MarkedArea } from '../Common/FormFields';

export default class TutSolForm extends Component {

  constructor(props) {
    super(props);
  }

  static displayName='TutSolForm';

  onSubmit = (e) => {
    e.preventDefault();
    //console.log(this.refs);
    var formData = {
      content: this.refs.content.state.value,
      linkMeta: this.refs.url.state.linkMeta
    };
    this.props.onSolutionSubmit(this.props.id, formData)

  };


  render () {

    return (
      <form className="solution-form">
        <fieldset>
          <section>
            <legend>Submit Tutorial</legend>
            <p>Fill out the fields below to share your tutorial request.<br/>Make sure to use http(s) prefix</p>
            <LinkInput ref="url" id="url" type="url" placeholder="Enter URL to tutorial"/>
            <MarkedArea
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
