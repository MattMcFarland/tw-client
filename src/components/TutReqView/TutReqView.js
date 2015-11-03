/**
 * Created by mmcfarland on 11/1/15.
 */
import React from 'react';
import TutReqStore from '../../stores/TutReqStore.js';
import TutReqActions from '../../actions/TutReqActions.js';
import TutorialRequest from './TutorialRequest';

export default class TutReqView extends React.Component {

  constructor(props) {
    super(props);
    this.state = TutReqStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    console.log(this.handlers);
    TutReqStore.listen(this.onChange);
    TutReqActions.init();
  }

  componentWillUnmount() {
    TutReqStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlers = {
    onVoteUp: () => {
      TutReqActions.vote(this.state.id, "up");
    },
    onVoteDown: () => {
      TutReqActions.vote(this.state.id, "down");
    },
    onCommentRevealForm: () => {
      TutReqActions.showCommentForm();
    },
    onCommentSubmit: (e) => {
      e.preventDefault();
      var {id, type} = e.currentTarget.dataset;
      var inputElem = document.getElementById(e.currentTarget.dataset.id + '-input');
      var value = inputElem.value;
      TutReqActions.addComment({id, type, value});
    },

    comments: {
      onVoteUp: (e) => {
        TutReqActions.voteComment(e.currentTarget.dataset.id);
      },
      onFlagSave: (e) => {
        //TutReqActions.vote(this.state.id, "down");
      },
      onEditChange: (e) => {
        //TutReqActions.vote(this.state.id, "down");
      },
      onEditSave: (e) => {
        //TutReqActions.vote(this.state.id, "down");
      }
    }
  }


  render() {
    if (this.state && this.state.ready) {
      return (
        <div>
          <TutorialRequest
            data={this.state}
            handlers={this.handlers}
            />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
