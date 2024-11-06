import React from 'react';

import clsx from 'clsx';

import { InputChildProps, InputRootProps } from './input.types';

const InputRoot: React.FC<InputRootProps> = ({ children, className, required, type, disabled, ...props }) => {
  const inputEnhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<InputChildProps>(child)) return React.cloneElement(child, { type, disabled, required });
    return child;
  });

  if (!inputEnhancedChildren) return null;

  return (
    <div className={clsx('relative', className)} {...props}>
      {inputEnhancedChildren}
    </div>
  );
};

export default InputRoot;
