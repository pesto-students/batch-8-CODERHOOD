import React from 'react';
import cn from 'classnames';

const InputField = ({
  label,
  labelDirection, 
  type = "text",
  className, 
  placeholder,
  id,
  error,
  ...props
}) => {
  return (
    <div className={cn(
      "field",
      labelDirection && `has-text-${labelDirection}`
    )}>
      <label htmlFor={id} className="label">{label}</label>
      <div className="control">
        <input 
          id={id} 
          type={type} 
          placeholder={placeholder} 
          {...props}
          className={cn(
            "input",
            className
          )}
        />
      </div>
      {error ? <p className="is-pulled-right help is-danger">{error}</p> : null}
    </div>
  );
};

export default InputField;