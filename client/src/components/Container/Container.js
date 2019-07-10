import React from 'react';

const Container = (props) => {
  return (
    <section className="section">
      <div className="container">
        {props.children}
      </div>
    </section>
  );
};

export default Container;