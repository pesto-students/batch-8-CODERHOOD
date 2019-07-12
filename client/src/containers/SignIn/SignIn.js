import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SmallContainer from '../../components/SmallContainer/SmallContainer';
import InputField from '../../components/InputField/InputField';
import { getError, hasError, isTouched } from '../../libs/validate';
import callApi from '../../libs/axios';
import './SignIn.css';
import handleErrors from './Schema';

function SignIn(props) {
  const [ user, setUser ] = useState({ email: '', password: '' });
  const [ touched, setTouched ]= useState({});
  const [ error, setError ] = useState({});

  const touchedFields = {}
  
  const handleChange = field => event => {
    setUser({ ...user, [field]: event.target.value })
    handleErrors(user, setError);
  }

  const handleBlur = (field) => (event) => {
    handleErrors(user, setError);
    touchedFields[field] = true;
    setTouched({ ...touched, ...touchedFields})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const result = await callApi('post', '/user/login', { email, password });
    if (result.data) {
      const { Data } = result.data;
      const user = JSON.stringify(Data);
      localStorage.setItem('user', user);
      props.history.push('/');
    } else {
      alert(result);
    }
  }
  
  return (
    <SmallContainer>
      <form className="has-text-centered">
        <figure className="image is-128x128">
          <img src="https://dummyimage.com/100x100/000/fff&text=CoderHood" alt="CoderHood" className="brand-logo is-rounded"/>
        </figure>

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
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>

        <p className="formFooter">
          Not a registered user?<br />
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </SmallContainer>    
  );
}

export default SignIn;
