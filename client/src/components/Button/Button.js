import React from 'react';
import cn from 'classnames';

const Button = ({
  tag = 'a',
  bwShade,
  type, 
  size, 
  fullwidth, 
  outlined, 
  inverted, 
  rounded,
  hovered,
  focussed,
  active,
  loading,
  disabled,
  btnStatic,
  ...props
}) => {

  let title;
  if (disabled) {
    title = 'Disabled button';
  }

  const defaultProps = {
    'a': { title },
    'button': {}
  }
  const tagName = (tag === 'button') ? 'button' : 'a';
  
  return (
    <a 
      className={cn(
        "button",
        bwShade && `is-${bwShade}`,
        type && `is-${type}`,
        size && `is-${size}`,
        fullwidth && `is-fullwidth`,
        outlined && `is-outlined`,
        inverted && `is-inverted`,
        rounded && `is-rounded`,
        hovered && `is-hovered`,
        focussed && `is-focussed`,
        active && `is-active`,
        loading && `is-loading`,
        btnStatic && `is-static`
      )}
      { ...defaultProps[tagName] }
      { ...props }
    >{props.children}</a>
  )
}

export default Button;