import React from 'react';

const facebook = 'https://www.facebook.com/sharer/sharer.php?u=';
const twitter = 'https://twitter.com/intent/tweet?text=';
const email = 'mailto:?subject=I wanted you to see this site&amp;body=Check out this site+';

export const FacebookBtn = ({href}) => (
  <a href = {facebook + href}
          className="btn btn-share facebook">
    <span className="icon ion-social-facebook"/>
  </a>
);

export const TwitterBtn = ({href}) => (
  <a href = {twitter + href}
          className="btn btn-share twitter">
    <span className="icon ion-social-twitter"/>
  </a>
);

export const EmailBtn = ({href}) => (
  <a href={email + href}
          className="btn btn-share email">
    <span className="icon ion-email"/>
  </a>
);
