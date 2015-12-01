import RSelect from 'react-select';
import React from 'react';

export default class Select extends RSelect {
  constructor(props) {
    super(props);
    // override addValue to prevent duplicate generation errors.
    this.addValue = (value) => {
      var test = value.hasOwnProperty('value') ? value.value : value;
      if ((this.state.values.map(i => i.value).indexOf(test) === -1) && test.trim().length) {
        this.setValue(this.state.values.concat(value));
      }
    }

  }
};
