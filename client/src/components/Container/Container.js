import React from 'react';

const Container = (props) => {
  return (
    <section class="section">
      <div class="container">
        {props.children}
      </div>
    </section>
  );
};

export default Container;