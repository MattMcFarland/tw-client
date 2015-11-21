import React from 'react';

class ShareWidget extends React.Component {

  render () {
    return (
      <div className="widget share">
        <header><h4><span className="icon ion-android-share-alt blue"></span>Share</h4></header>
        <section className="widget-body">
          <button className="btn btn-share facebook"><span className="icon ion-social-facebook"></span></button>
          <button className="btn btn-share twitter"><span className="icon ion-social-twitter"></span></button>
          <button className="btn btn-share email"><span className="icon ion-email"></span></button>
        </section>
      </div>
    );
  }
}

export default ShareWidget;
