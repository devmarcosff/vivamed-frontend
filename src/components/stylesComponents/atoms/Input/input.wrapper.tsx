import React from 'react';

import { InputChildProps, InputWrapperProps } from './input.types';
import { containerVariant } from './input.variants';

const InputWrapper: React.FC<InputWrapperProps> = ({ type, children, required, disabled, className, ...props }) => {
  const inputWrapperEnhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<InputChildProps>(child)) return React.cloneElement(child, { type, disabled, required });
    return child;
  });

  if (!inputWrapperEnhancedChildren) return null;

  return (
    <div className={containerVariant({ type, disabled, className })} {...props}>
      {inputWrapperEnhancedChildren}
    </div>
  );
};

export default InputWrapper;
