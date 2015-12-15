import React from 'react';
var d = new Date();
var n = d.getFullYear();

const Footer = () => (
  <footer className="teh-footer">
    <div className="main-content-container cf">
      <div className="main-content">
        <p>Copyright &copy; 2015-{n} wanted-tuts.com - All Rights Reserved.</p>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/terms-of-use">Terms of Use</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
