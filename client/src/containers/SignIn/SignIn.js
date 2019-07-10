import React from "react";
import SmallContainer from '../../components/SmallContainer/SmallContainer';
import './SignIn.css';

function SignIn() {
  return (
    <SmallContainer>
      <div className="has-text-centered">

        <figure class="image is-128x128">
          <img src="https://dummyimage.com/100x100/000/fff&text=CoderHood" alt="CoderHood" className="brand-logo is-rounded"/>
        </figure>
        <br/>

        <div className="field has-text-left">
          <label for="email" className="label is-text-left">Email</label>
          <div className="control">
            <input id="email" className="input email" type="email" placeholder="Email" />
          </div>
        </div>

        <div className="field has-text-left">
          <label for="password" className="label is-text-left">Password</label>
          <div className="control">
            <input id="password" className="input password" type="password" placeholder="Password" />
          </div>
        </div>

        <div class="control">
          <button class="button is-primary">Submit</button>
        </div>

        <br/>
        <br/>
        <p>
          Not a registered user?<br />
          <a href="/signup">Sign Up</a>
        </p>
        
      </div>
    </SmallContainer>    
  );
}

export default SignIn;
