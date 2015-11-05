/**
 * Created by mmcfarland on 11/1/15.
 */
import React from 'react';
import TutReqStore from '../../stores/TutReqStore.js';
import TutReqActions from '../../actions/TutReqActions.js';
import TutorialRequest from './TutorialRequest';
import TutorialSolution from './TutorialSolution';
//import TutSolForm from './TutSolForm';

export default class TutReqView extends React.Component {

  constructor(props) {
    super(props);
    this.state = TutReqStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //console.log(this.handlers);
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
      TutReqActions.vote({
        direction: "up",
        id: this.state.id,
        type: this.state.type
      });
    },
    onVoteDown: () => {
      TutReqActions.vote({
        direction: "down",
        id: this.state.id,
        type: this.state.type
      });
    },
    onCommentRevealForm: () => {
      TutReqActions.showCommentForm({id: this.state.id});
    },
    onCommentSubmit: (e) => {
      e.preventDefault();
      var {id, type} = e.currentTarget.dataset;
      var inputElem = document.getElementById(e.currentTarget.dataset.id + '-input');
      var message = inputElem.value;
      TutReqActions.addComment({id, type, message});
    },
    onFlagSave: (e) => {
      TutReqActions.toggleFlag({
        type: 'TutorialRequest',
        id: e.currentTarget.dataset.id,
        flagType: e.currentTarget.dataset.key
      })
    },
    onEnableEditContent: () => {
      TutReqActions.toggleItemEdit({
        type: 'TutorialRequest',
        id: this.state.id
      })
    },
    onEditContentSave: (e) => {
      e.preventDefault();
      var inputElem = document.getElementById(this.state.id + '-edit-content');
      var content = inputElem.value;

      TutReqActions.updateItem({
        type: 'TutorialRequest',
        id: this.state.id,
        fields: { content },
        items: ['content', 'editorUrl', 'editorName', 'updated_at', 'created_at']
      })
    },
    onDelete: (e) => {
      var id = e.currentTarget.dataset.id;
      TutReqActions.deleteItem({
        id,
        type: "TutorialRequest"
      });
    },
    comments: {
      onVoteUp: (e) => {
        TutReqActions.vote({
          type: "Comment",
          collection: "comments",
          direction: "up",
          id: e.currentTarget.dataset.id
        });
      },
      onFlagSave: (e) => {
        TutReqActions.toggleFlag({
          type: 'Comment',
          id: e.currentTarget.dataset.id,
          flagType: e.currentTarget.dataset.key
        })
      },
      onEnableEdit: (e) => {
        TutReqActions.toggleItemEdit({
          type: 'Comment',
          collection: 'comments',
          id: e.currentTarget.dataset.id
        })
      },

      onEditChange: (e) => {
        //TutReqActions.vote(this.state.id, "down");
      },

      onEditSave: (e) => {
        e.preventDefault();
        var id = e.currentTarget.dataset.id;
        var inputElem = document.getElementById(e.currentTarget.dataset.id + '-edit-input');
        var message = inputElem.value;
        TutReqActions.updateItem({
          id,
          collection: "comments",
          type: "Comment",
          items: ['message', 'updated_at', 'editorUrl', 'editorName'],
          fields: {message}
        });
      },

      onDelete: (e) => {
        var id = e.currentTarget.dataset.id;
        TutReqActions.deleteItem({
          id,
          collection: "comments",
          type: "Comment"
        });
      }
    }
  }


  render() {
    var TutSolList = this.state.solutions.map((sol) => {
      return (
        <div key={sol.id}>
          <TutorialSolution
            type={sol.type}
            data={sol}
            volatile={sol.volatile}
            />
        </div>
      );
    });
    if (this.state && this.state.ready) {
      return (
        <div>
          <TutorialRequest
            data={this.state}
            handlers={this.handlers}
            volatile={this.state.volatile}
            />
          {TutSolList}

        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
