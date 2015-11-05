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
      description: this.refs.description.state.value,
      linkMeta: this.refs.url.state.linkMeta
    };
    this.props.onSolutionSubmit(this.props.id, formData)

  };


  render () {

    return (
      <div className="tutorial-request-form container-fluid">
        <hr/>
        <h3 id="add-tutorial" ref="test">Add a Tutorial</h3>
        <form style={{padding: "2em 0"}}>
          <LinkInput
            ref="url"
            label="Enter URL to tutorial"
            id="url"
            tip="Make sure to use http(s) prefix"
            />
          <MarkedArea
            ref="description"
            label="Provide a description of your tutorial"
            tip="You can use Github flavored markdown to dress up your request."
            />
            <input className="btn btn-primary" type="submit" value="Submit" onClick={this.onSubmit}/>
        </form>
      </div>
    );
  }
}
