import React from 'react';
import cn from 'classnames';

const InputField = ({
  label,
  labelDirection, 
  type = "text",
  className, 
  placeholder,
  id,
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
          className={cn(
          "input",
          className
        )} />
      </div>
    </div>
  );
};

export default InputField;