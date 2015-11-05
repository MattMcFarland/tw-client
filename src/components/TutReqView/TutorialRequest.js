import React from 'react';
import BasePost from '../Common/BasePost';

export default class TutorialRequest extends BasePost {

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    if (!this.handlers) this.handlers = props.handlers;
  }


}
