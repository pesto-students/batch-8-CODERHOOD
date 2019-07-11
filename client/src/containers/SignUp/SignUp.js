import React from 'react';
import { Link } from 'react-router-dom'
import SmallContainer from '../../components/SmallContainer/SmallContainer';
import InputField from '../../components/InputField/InputField';
import './SignUp.css';

const SignUp = () => (
  <SmallContainer>
    <form className="has-text-centered">
      <figure className="image is-128x128">
        <img src="https://dummyimage.com/100x100/000/fff&text=CoderHood" alt="CoderHood" className="brand-logo is-rounded"/>
      </figure>

      <InputField labelDirection="left" type="name" id="name" label="Name" />
      <InputField labelDirection="left" type="email" id="email" label="Email" />
      <InputField labelDirection="left" type="password" id="password" label="Password" />

      <div className="control has-text-centered">
        <button className="button is-primary">Sign Up</button>
      </div>

      <p className="formFooter">
        Already a registered user?<br />
        <Link to="/signin">Sign In</Link>
      </p>
    </form>
  </SmallContainer>
);

export default SignUp;
