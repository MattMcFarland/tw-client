import React from 'react';


// ?lines=13&length=27&width=13&radius=42&scale=1.25&corners=1.0&opacity=0.20&rotate=0&direction=1&speed=1.3&trail=54&top=50&left=50&shadow=on&hwaccel=on
const opts = {
  lines: 13 // The number of lines to draw
  , length: 27 // The length of each line
  , width: 13 // The line thickness
  , radius: 42 // The radius of the inner circle
  , scale: 1.25 // Scales overall size of the spinner
  , corners: 1 // Corner roundness (0..1)
  , color: '#000' // #rgb or #rrggbb or array of colors
  , opacity: 0.2 // Opacity of the lines
  , rotate: 0 // The rotation offset
  , direction: 1 // 1: clockwise, -1: counterclockwise
  , speed: 1.3 // Rounds per second
  , trail: 54 // Afterglow percentage
  , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
  , zIndex: 2e9 // The z-index (defaults to 2000000000)
  , className: 'spinner' // The CSS class to assign to the spinner
  , top: '0%' // Top position relative to parent
  , left: '50%' // Left position relative to parent
  , shadow: true // Whether to render a shadow
  , hwaccel: true // Whether to use hardware acceleration
  , position: 'absolute' // Element positioning
}

export default class Spinner extends React.Component {

  componentDidMount () {
    var spinner = new window.Spinner(opts).spin()
    this.refs.body.appendChild(spinner.el)
  }
  render () {
    return (
    <aside className="loadbox">
      <div ref="body">&nbsp;</div>
    </aside>
    );
  }

}
