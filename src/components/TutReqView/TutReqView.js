/**
 * Created by mmcfarland on 11/1/15.
 */
import React from 'react';
import TutReqStore from '../../stores/TutReqStore.js';
import TutReqActions from '../../actions/TutReqActions.js';
import TutorialRequest from './TutorialRequest';
import TutorialSolution from './TutorialSolution';
import TutSolForm from './TutSolForm';
import MainContent from '../Common/MainContent';

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
  validateTags = (latags) => {
    var
      errors = [],
      tags = latags.split(','),
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
  validateContent = (content) => {
    var
      errors = [],
      rules = [
        {
          el: 'content',
          failOn: content.trim().length < 30,
          error: 'Request content is not long enough and must be 30 characters in length.'
        },
        {
          el: 'content',
          failOn: content.trim().length > 2400,
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
  validateComment = (message) => {
    var
      errors = [],
      rules = [
        {
          el: 'message',
          failOn: message.trim().length < 10,
          error: 'Your comment must be at least 10 characters in length.'
        },
        {
          el: 'message',
          failOn: message.trim().length > 140,
          error: 'Your comment may not exceed 140 characters.'
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

      var valid = this.validateComment(message);

      if (valid.errors) {

        let article = valid.errors.length > 1 ? 'are' : 'is';
        let noun = valid.errors.length > 1 ? 'errors' : 'error';
        let count = valid.errors.length > 1 ? valid.errors.length : 'one';

        this.setState({
          commentError: {
            message: `There ${article} ${count} ${noun} in your tutorial request, please try again.`,
            data: valid.errors
          }
        })

        return false;

      } else {

        TutReqActions.addComment({id, type, message});
      }
    },
    onSolutionSubmit: (id, formData) => {
      TutReqActions.addSolution({id, formData});
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
    onEnableEditTags: () => {
      TutReqActions.toggleTagsEdit({
        type: 'TutorialRequest',
        id: this.state.id
      })
    },
    onEditTagsSave: (e) => {
      e.preventDefault();
      var inputElem = document.querySelector('input[type="hidden"]');
      var tags = inputElem.value;
      var valid = this.validateTags(tags);

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
        this.setState({error: null});
        TutReqActions.updateItem({
          type: 'TutorialRequest',
          id: this.state.id,
          fields: { tags },
          items: ['tags', 'editorUrl', 'editorName', 'updated_at', 'created_at']
        })
      }
    },
    onApproveTag: (e) => {
      TutReqActions.judgeTag({
        id: e.currentTarget.dataset.id,
        decision: 'approve'
      })
    },
    onDenyTag: (e) => {
      TutReqActions.judgeTag({
        id: e.currentTarget.dataset.id,
        decision: 'deny'
      })
    },
    onEditContentSave: (e) => {
      e.preventDefault();
      var inputElem = document.getElementById(this.state.id + '-edit-content');
      var content = inputElem.value;
      var valid = this.validateContent(content);

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
        this.setState({error: null});

        TutReqActions.updateItem({
          type: 'TutorialRequest',
          id: this.state.id,
          fields: { content },
          items: ['content', 'editorUrl', 'editorName', 'updated_at', 'created_at']
        })
      }

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

        var valid = this.validateComment(message);

        if (valid.errors) {

          let article = valid.errors.length > 1 ? 'are' : 'is';
          let noun = valid.errors.length > 1 ? 'errors' : 'error';
          let count = valid.errors.length > 1 ? valid.errors.length : 'one';

          this.setState({
            commentError: {
              message: `There ${article} ${count} ${noun} in your tutorial request, please try again.`,
              data: valid.errors
            }
          })

          return false;

        } else {


          TutReqActions.updateItem({
              id,
              collection: "comments",
              type:       "Comment",
              items:      [ 'message', 'updated_at', 'editorUrl', 'editorName' ],
              fields:     {message}
            }
          );
        }
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
    var tutSolList = this.state.solutions.map((sol) => {
      return (
        <li key={sol.id}>
          <TutorialSolution
            type={sol.type}
            data={sol}
            volatile={sol.volatile}
          />
        </li>
      );
    });
    if (this.state && this.state.ready) {
      return (
        <section>
          <MainContent>
            <TutorialRequest
              data={this.state}
              handlers={this.handlers}
              volatile={this.state.volatile}
            />
            <ul className="tutorial-solution-list">{tutSolList}</ul>
          </MainContent>
          <TutSolForm
            id={this.state.id}
            pending={this.state.volatile.solutionPending}
            onSolutionSubmit={this.handlers.onSolutionSubmit}/>
        </section>
      );
    } else {
      return <div></div>;
    }
  }
}
