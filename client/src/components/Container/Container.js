import React from 'react';
import './Container.css';

const Container = (props) => {
  return (
    <section className="section container" style={{ minWidth: '100%' }}>
      <div className="container" style={{ minWidth: '100%' }}>
        {props.children}
      </div>
    </section>
  );
};

export default Container;
