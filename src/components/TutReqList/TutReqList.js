import React from 'react';
import moment from 'moment';
import IndexActions from '../../actions/IndexActions.js'
import IndexStore from '../../stores/IndexStore.js'

export default class TutReqList extends React.Component {

  constructor(props) {
    super(props);
    this.state = IndexStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    IndexStore.listen(this.onChange);
    IndexActions.initialFetch();
  }
  componentWillUnmount() {
    IndexStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  onVoteUp = () => {
    TutorialRequestActionCreators.voteOnTutorialRequest(this.state.data.id, 'up');
  };
  filterByLatest = () => {
    IndexActions.filterBy('latest')
  };
  filterByWanted = () => {
    IndexActions.filterBy('wanted')
  };
  filterByBest = () => {
    IndexActions.filterBy('best')
  };
  render () {
    var {isLoading, reqList, activeTab} = this.state;
    var listItems = !isLoading && reqList && reqList.length ? reqList.map((li) => {
      return (
        <li key={li.id} className="row">
            <div className={li.score < 0 ?
                "tr-col badge score down" :
                li.score > 0 ?
                "tr-col badge score up" :
                'tr-col badge score'}>
              {li.score}
            </div>
            <div className="tr-col well">
              <h4>{li.title}</h4>
              <em>
                <span>Submitted by</span>
                &nbsp;
                <a href={li.authorUrl}>{li.authorName}</a>
                &nbsp;
                <a href={"/tutorial-request/" + li.permalink}>{moment(li.created_at).fromNow()}</a>
              </em>
            </div>
        </li>
      );
    }) : '';
    return (
      <section>
        <section className="tut-tabs">
          <ul className="nav nav-tabs">
            <li className={activeTab === "latest" ? 'active' : ''}>
              <button onClick={this.filterByLatest} type="button">Latest Requests</button>
            </li>
            <li className={activeTab === "wanted" ? 'active' : ''}>
              <button onClick={this.filterByWanted} type="button">Most Wanted</button>
            </li>
            <li className={activeTab === "best" ? 'active' : ''}>
              <button onClick={this.filterByBest} type="button">Best Tutorials</button>
            </li>
          </ul>
        </section>
        <section>
          <ul className="container-fluid tr-list">
            {listItems}
          </ul>
        </section>
        <div className="text-center">
          <button type="button" className="btn btn-info">Load more</button>
        </div>
      </section>
    )
  }

};
