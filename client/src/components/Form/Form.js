import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SmallContainer from '../SmallContainer/SmallContainer';
import InputField from '../InputField/InputField';
import {
  getError,
  hasError,
  isTouched,
  handleErrors
} from '../../libs/validate';
import { handleChange, handleBlur } from '../../libs/handleInputEvents';
import logo from '../../constants/constants';

import './Form.css';

const Form = props => {

  const {
    inputs,
    schema,
    handleSubmit,
    submitLabel,
    footerLabel,
    linkTo,
    linkToLabel,
    dispatch,
    initialData,
    alwaysEnableButton
  } = props;

  const [user, setUser] = useState(initialData ? initialData : {});
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});



  useEffect(() => handleErrors(schema, user, setError), [schema, user]);

  const renderInputField = ({ type, label, key }) => (
    <InputField
      key={key}
      labelDirection='left'
      type={type}
      id={type}
      label={label}
      onChange={handleChange(setUser, user, type)}
      onBlur={handleBlur(setTouched, touched, type)}
      error={error[type] ? getError(type, touched, error) : null}
      value={user[type] ? user[type] : ''}
    />
  );



  return (
    <form className="has-text-centered">
      <figure className="image is-128x128">
        <img
          src={logo.src}
          alt={logo.alt}
          className="brand-logo is-rounded"
        />
      </figure>

      {inputs.map(({ type }, index) => renderInputField({ type, label: schema.fields[type]._label, key: index }))}

      <div className="control has-text-centered">
        <button
          className="button is-primary"
          disabled={!alwaysEnableButton && (hasError(error) || !isTouched(touched))}
          onClick={e => handleSubmit(e, user, props.history, dispatch, props)}
        >
          {submitLabel}
        </button>
      </div>

      <p className="formFooter">
        {footerLabel}
        <br />
        <Link to={linkTo}>{linkToLabel}</Link>
      </p>
    </form>
  );
};

export default Form;
