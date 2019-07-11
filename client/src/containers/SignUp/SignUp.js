import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import SmallContainer from '../../components/SmallContainer/SmallContainer';
import InputField from '../../components/InputField/InputField';
import './SignUp.css';

const SignUp = () => {
  const [ user, setUser ] = useState({ name: '', email: '', password: '' });
  const [ touched, setTouched ]= useState({});
  const [ error, setError ] = useState({});

  const schema = Yup.object().shape({
    name: Yup
      .string()
      .required()
      .label('Name'),
    email: Yup
      .string().email()
      .required()
      .label('Email'),
    password: Yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Min 8 characters and must contain at least one lowercase letter, one uppercase and a number.')
      .required().label('Password'),
  });
  
  const touchedFields = {}

  const handleErrors = () => {
    const parsedErrors = {};
    const {
      name,
      email,
      password,
    } = user;
    schema.validate({
      name,
      email,
      password,
    }, { abortEarly: false })
      .then(() => setError({ ...{} }))
      .catch((error) => {
        error.inner.forEach((element) => {
          parsedErrors[element.path] = element.path ? element.message : '';
        });
        setError({ ...parsedErrors })
      });
  }

  
  const handleChange = field => event => {
    setUser({ ...user, [field]: event.target.value }, () => handleErrors(
      schema,
      setError,
      error,
      user,
    ));
  }

  const isTouched = () => {
    return !!Object.keys(touched).length;
  }

  const getError = (field) => {
    if (touched[field]) {
      return error[field];
    }
    return null;
  }

  const hasError = () => {
    return !!Object.keys(error).length;
  }

  const handleBlur = (field) => (event) => {
    handleErrors(schema, setError, error, user);
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
          error={ error.email ? getError('name') : null}
          value={user.name}
        />
        <InputField
          labelDirection="left"
          type="email"
          id="email"
          label="Email"
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={ error.email ? getError('email') : null}
          value={user.email}
        />
        <InputField
          labelDirection="left"
          type="password"
          id="password"
          label="Password"
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={ error.password ? getError('password') : null}
          value={user.password}
        />

        <div className="control has-text-centered">
          <button
            className="button is-primary"
            disabled={ hasError() || !isTouched() }
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
