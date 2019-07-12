import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SmallContainer from '../../components/SmallContainer/SmallContainer';
import InputField from '../../components/InputField/InputField';
import { getError, hasError, isTouched } from '../../libs/validate';
import handleErrors from './Schema';
import './SignUp.css';

const SignUp = () => {
  const [ user, setUser ] = useState({ name: '', email: '', password: '' });
  const [ touched, setTouched ]= useState({});
  const [ error, setError ] = useState({});
  
  const touchedFields = {}
  
  const handleChange = field => event => {
    setUser({ ...user, [field]: event.target.value }, () => handleErrors(user, setError));
  }

  const handleBlur = (field) => (event) => {
    handleErrors(user, setError);
    touchedFields[field] = true;
    setTouched({ ...touched, ...touchedFields})
  }

  return (
    <SmallContainer>
      <form className="has-text-centered">
        <figure className="image is-128x128">
          <img src="https://dummyimage.com/100x100/000/fff&text=CoderHood" alt="CoderHood" className="brand-logo is-rounded"/>
        </figure>

        <InputField 
          labelDirection="left"
          type="name"
          id="name"
          label="Name"
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={ error.email ? getError('name', touched, error) : null}
          value={user.name}
        />
        <InputField
          labelDirection="left"
          type="email"
          id="email"
          label="Email"
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={ error.email ? getError('email', touched, error) : null}
          value={user.email}
        />
        <InputField
          labelDirection="left"
          type="password"
          id="password"
          label="Password"
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={ error.password ? getError('password', touched, error) : null}
          value={user.password}
        />

        <div className="control has-text-centered">
          <button
            className="button is-primary"
            disabled={ hasError(error) || !isTouched(touched) }
          >
            Sign Up
          </button>
        </div>

        <p className="formFooter">
          Already a registered user?<br />
          <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </SmallContainer>
  )
};

export default SignUp;
