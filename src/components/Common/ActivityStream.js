import React from 'react';

class ActivityStream extends React.Component {

  render () {

    return (
      <div className="widget activity-stream">
        <header>
          <h4><span className="icon ion-ios-pulse-strong blue"></span>Activity Stream</h4>
        </header>
        <section className="widget-body">
          <ul>
            <li><span className="icon ion-chevron-down down"></span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus dapibus urna quis posuere. </p></li>
            <li><span className="icon ion-ios-chatboxes-outline blue"></span><p>Phasellus pulvinar magna a massa maximus imperdiet. Sed sed sagittis eros, vel cursus neque. In sodales ipsum id turpis viverra, et venenatis diam tincidunt.</p></li>
            <li><span className="icon ion-chevron-up up"></span><p>Maecenas justo odio, tempus sed velit sed, mattis fermentum lorem. Sed placerat nisi vitae ante blandit, et volutpat massa cursus. </p></li>
            <li><span className="icon ion-document blue"></span><p>onec nunc ipsum, laoreet non velit non, lobortis pellentesque felis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam ultricies neque eu arcu tincidunt, eu venenatis orci cursus.</p></li>
          </ul>
        </section>
      </div>

    );

  }
}

export default ActivityStream;
