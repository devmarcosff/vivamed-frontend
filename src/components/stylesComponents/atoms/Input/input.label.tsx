import React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';
import clsx from 'clsx';

import { InputLabelProps } from './input.types';

const InputLabel: React.FC<InputLabelProps> = ({ required = false, children, className, ...props }) => {
  return (
    <LabelPrimitive.Label className={clsx('block text-body mb-2 select-none', className)} {...props}>
      {children} {required && <span className="text-allintra-error-500">*</span>}
    </LabelPrimitive.Label>
  );
};

export default InputLabel;
