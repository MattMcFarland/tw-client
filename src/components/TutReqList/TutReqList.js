import React from 'react';
import moment from 'moment';
import IndexActions from '../../actions/IndexActions.js'
import IndexStore from '../../stores/IndexStore.js'
import classNames from 'classnames'

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
    var {isLoading, reqList, activeTab, lastPage} = this.state;
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
        <li key={li.id} className="row">
            <div className={liClassName}>
              <span className="score-label">score:</span>
              <div className="score-num">{li.score}</div>
            </div>
            <div className="tr-col well">
              <h4><a href={"/tutorial-request/" + li.permalink}>{li.title}</a></h4>
              <p>
                <em>
                  <span>Submitted by</span>
                  &nbsp;
                  <a href={li.authorUrl}>{li.authorName}</a>
                  &nbsp;
                  <a href={"/tutorial-request/" + li.permalink}>{moment(li.created_at).fromNow()}</a>
                </em>
              </p>
              <div>
                {info}
                <ul className="taglist">
                  {tags}
                </ul>
              </div>
            </div>
        </li>
      );
    });
    return (
      <section>
        <section className="tut-tabs">
          <ul className="nav nav-tabs">
            <li className={activeTab === "latest" ? 'active' : ''}>
              <button data-filter="latest" onClick={this.onFilter} type="button">Latest Requests</button>
            </li>
            <li className={activeTab === "wanted" ? 'active' : ''}>
              <button data-filter="wanted" onClick={this.onFilter} type="button">Most Wanted</button>
            </li>
            <li className={activeTab === "best" ? 'active' : ''}>
              <button data-filter="best" onClick={this.onFilter} type="button">Best Tutorials</button>
            </li>
          </ul>
        </section>
        <section>
          <ul className="container-fluid tr-list">
            {listItems}
          </ul>
        </section>
        {lastPage ? '' : <div className="text-center">
          <button type="button" onClick={this.nextPage} className="btn btn-info">Load more</button>
        </div>}
      </section>
    )
  }

};
