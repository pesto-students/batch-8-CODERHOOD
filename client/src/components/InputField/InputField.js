import React from 'react';
import cn from 'classnames';
import capitalizeFirstLetter from '../../libs/utils';

const InputField = ({
  label,
  labelDirection, 
  type,
  className, 
  placeholder,
  id,
  error,
  ...props
}) => {
  const getLabel = () => {
    if (label) {
      return label
    }
    if (type) {
      return capitalizeFirstLetter(type);
    }
    return null;
  }

  return (
    <div className={cn(
      "field",
      labelDirection && `has-text-${labelDirection}`
    )}>
      <label htmlFor={id} className="label">{getLabel()}</label>
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