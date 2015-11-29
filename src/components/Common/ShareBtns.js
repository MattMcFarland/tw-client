import React from 'react';

const facebook = 'https://www.facebook.com/sharer/sharer.php?u=';
const twitter = 'https://twitter.com/intent/tweet?text=';
const email = 'mailto:?subject=I wanted you to see this site&amp;body=Check out this site+';

export const FacebookBtn = ({href= window.location.href}) => (
  <a data-tipsy="Share on Facebook" href = {facebook + href}
          className="tipsy tipsy--sw btn btn-share facebook">
    <span className="icon ion-social-facebook"/>
  </a>
);

export const TwitterBtn = ({href= window.location.href}) => (
  <a data-tipsy="Share on Twitter"  href = {twitter + href}
          className="tipsy tipsy--sw btn btn-share twitter">
    <span className="icon ion-social-twitter"/>
  </a>
);

export const EmailBtn = ({href= window.location.href}) => (
  <a data-tipsy="Share via email" href={email + href}
          className="tipsy tipsy--sw btn btn-share email">
    <span className="icon ion-email"/>
  </a>
);
