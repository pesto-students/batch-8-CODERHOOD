import React from 'react';

const Columns = (props) => {
  return (
    <section className="columns">
      {props.children}
    </section>
  );
};

export default Columns;