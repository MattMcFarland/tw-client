import React from 'react';
import Tabs from './Tabs';

const goTop = (e) => {
  e.preventDefault();
  window.scrollTo(0,0);
}

class MainContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTopBtn: false
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', (e) => {
      var top  = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 100 && !this.state.showTopBtn) {
        this.setState({showTopBtn: true});
      } else if (top <= 100 && this.state.showTopBtn) {
        this.setState({showTopBtn: false});
      }
    });

  }
  render () {
    let { showTopBtn } = this.state;
    return (
      <div ref="maincontent" className="main-content-container cf">
        <div className="main-content">
          {this.props.children}
        </div>
        <button style={{

          opacity: showTopBtn ? 1 : 0,
          position: 'fixed',
          bottom: '40px',
          background: '#666',
          fontSize: '24px',
          color: 'white',
          right: '40px',
          zIndex: '999',
          padding: '12px 12px 12px 14px',
          borderRadius: '2px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)'
        }} onClick={goTop} className="gotop" type="button"><span className="ion ion-chevron-up"/></button>
      </div>
    );
  }
}

export default MainContent;
