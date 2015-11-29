import React from 'react';
import { FacebookBtn, TwitterBtn, EmailBtn } from './ShareBtns';
import Widget from './Widget';


const ShareWidget = () => (
  <div>
  <Widget title="Share" icon="ion-android-share-alt" addClass="share">
    <FacebookBtn/>
    <TwitterBtn/>
    <EmailBtn/>
  </Widget>
  </div>
);

export default ShareWidget;
