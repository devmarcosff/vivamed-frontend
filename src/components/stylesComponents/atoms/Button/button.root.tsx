import React from 'react';

import { ButtonRootProps } from './button.types';
import { buttonVariants } from './button.variants';

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ children, className, variant, isHidden, ...props }, ref) => {
    if (isHidden) return null;
    return (
      <button ref={ref} className={buttonVariants({ variant, className })} data-type={variant} {...props}>
        {children}
      </button>
    );
  }
);

export default ButtonRoot;
