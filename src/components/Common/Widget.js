import React from 'react';
const Widget = ({
  addClass,
  icon,
  title,
  children
}) => (
  <div className={ "widget" + addClass}>
    <header><h4><span className={"icon " + icon + " blue"}/>{title}</h4></header>
    <section className="widget-body">
      {children}
    </section>
  </div>
);

export default Widget;
