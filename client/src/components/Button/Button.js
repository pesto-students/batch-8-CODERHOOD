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
  cls,
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
  const TagName = (tag === 'button') ? 'button' : 'a';
  
  return (
    <TagName 
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
        btnStatic && `is-static`,
        cls,
      )}
      { ...defaultProps[TagName] }
      { ...props }
    >{props.children}</TagName>
  )
}

export default Button;