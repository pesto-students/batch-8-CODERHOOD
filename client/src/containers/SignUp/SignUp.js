import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import SmallContainer from '../../components/SmallContainer/SmallContainer';
import InputField from '../../components/InputField/InputField';
import { getError, hasError, isTouched } from '../../libs/validate';
import handleErrors from './Schema';
import { handleChange, handleBlur } from '../../libs/handleInputEvents';
import logo from '../../constants/constants';
import './SignUp.css';

const SignUp = () => {
  const [ user, setUser ] = useState({ name: '', email: '', password: '' });
  const [ touched, setTouched ]= useState({});
  const [ error, setError ] = useState({});
  
  useEffect(() => handleErrors(user, setError), [user]);

  const renderInputField = ({type, label}) => (
    <InputField 
      labelDirection="left"
      type={type}
      id={type}
      label={label}
      onChange={handleChange(setUser, user, type)}
      onBlur={handleBlur(setTouched, touched, type)}
      error={ error[type] ? getError(type, touched, error) : null}
      value={user[type]}
    />
  )

  const inputs = [
    {
      type: 'name',
    },
    {
      type: 'email',
    },
    {
      type: 'password',
    },
  ];

  return (
    <SmallContainer>
      <form className="has-text-centered">
        <figure className="image is-128x128">
          <img
            src={logo.src}
            alt={logo.alt}
            className="brand-logo is-rounded"
          />
        </figure>

        {
          inputs.map(({type}) => renderInputField({type}))
        }

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
