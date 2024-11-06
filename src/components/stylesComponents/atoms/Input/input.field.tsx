import React from 'react';

import { InputFieldProps } from './input.types';
import { inputVariant } from './input.variants';

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ type, children, disabled, className, ...props }, ref) => {
    return <input ref={ref} className={inputVariant({ type, disabled, className })} disabled={disabled} {...props} />;
  }
);

export default InputField;
