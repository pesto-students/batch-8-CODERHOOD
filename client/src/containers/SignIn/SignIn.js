import React from "react";
import SmallContainer from '../../components/SmallContainer/SmallContainer';
import InputField from '../../components/InputField/InputField';
import './SignIn.css';

function SignIn() {
  return (
    <SmallContainer>
      <form className="has-text-centered">
        <figure className="image is-128x128">
          <img src="https://dummyimage.com/100x100/000/fff&text=CoderHood" alt="CoderHood" className="brand-logo is-rounded"/>
        </figure>

        <InputField labelDirection="left" type="email" id="email" label="Email" />
        <InputField labelDirection="left" type="password" id="password" label="Password" />

        <div className="control has-text-centered">
          <button className="button is-primary">Sign In</button>
        </div>

        <p className="formFooter">
          Not a registered user?<br />
          <a href="/signup">Sign Up</a>
        </p>
      </form>
    </SmallContainer>    
  );
}

export default SignIn;
