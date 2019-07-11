import React from 'react';
import Container from '../Container/Container';

const SmallContainer = (props) => {
  return (
    <Container>
      <div className="columns is-centered">
        <div className="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          {props.children}  
        </div>
      </div>
    </Container>
  );
};

export default SmallContainer;