import React from 'react';
import moment from 'moment';
import IndexActions from '../../actions/IndexActions.js'
import IndexStore from '../../stores/IndexStore.js'
import ListItem from './ListItem.js';
import Tabs from '../Common/Tabs';

import classNames from 'classnames'
import Spinner from '../../components/Common/Spinner';

export default class TutReqList extends React.Component {

  constructor(props) {
    super(props);
    this.state = IndexStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    IndexStore.listen(this.onChange);
    IndexActions.fetch();
  }
  componentDidUpdate() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.height = document.body.scrollHeight + 'px';
  }
  componentWillUnmount() {
    IndexStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  onFilter = (e) => {
    IndexActions.fetch(e.currentTarget.dataset.filter);
  };
  nextPage = () => {
    IndexActions.fetchNextPage(this.state.page, this.state.activeTab);
  }
  render () {
    var {isLoading, isLoadingNextPage, reqList, activeTab, lastPage} = this.state;
    var listItems = reqList.map((li) => {
      // add class called fufilled if there are solutions.length
      // add class up or down if score is +1 or -1 over zero.
      var
        info,
        s = li.solutions.length,
        ss = li.solutions.length > 1,
        liClassName = classNames('tr-col', 'badge', 'score', {
          'up': (li.score > 0),
          'down': (li.score < 0),
          'fufilled': (li.solutions.length)
        }),
        tags = li.tags.map((tag, index) => {
          return (
            <li key={index}
                className={tag.is_pending ? "pending" : "approved"}
                title={tag.is_pending ? "This tag is pending approval by moderators and may be removed" : "Tutorial request tagged with" + tag.name}
            >{tag.name}</li>
          );
        })

      if (li.solutions.length) {
        info = (<p>
          There <a href={"/tutorial-request/" + li.permalink}>{ss ? 'are' : 'is'} {s} {ss ? 'Tutorials' : 'Tutorial'}</a> issued for this request.
        </p>);
      } else {
        info = (<p>
          There is not a tutorial issued for this request yet.&nbsp;
          <a href={"/tutorial-request/" + li.permalink}>Click here to share yours.</a>
        </p>);
      }
      return (
        <li key={li.id}>
          <ListItem {...li} />
        </li>
      );
    });
    return (
      <section style={{
        opacity: isLoading ? 0.5 : 1,
        position: 'relative'
      }}>
        {isLoading ? <Spinner /> : ''}
        <Tabs onFilter={this.onFilter} activeTab={activeTab}/>
        <section>
          <ul className="container-fluid tr-list">
            {listItems}
          </ul>
        </section>
        {isLoadingNextPage ? <Spinner top="100%"/> : ''}
        {lastPage ? '' :
          <section className="load-more">
            <button onClick={this.nextPage} className="btn btn-primary">Load More</button>
          </section>
        }
      </section>
    )

  }

};
