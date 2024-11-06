import React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';
import clsx from 'clsx';

import { CheckboxLabelProps } from './checkbox.types';

const CheckboxLabel: React.FC<CheckboxLabelProps> = ({ children, disabled, ...props }) => {
  return (
    <LabelPrimitive.Label
      className={clsx('select-none', {
        'cursor-not-allowed opacity-50': disabled,
      })}
      {...props}
    >
      {children}
    </LabelPrimitive.Label>
  );
};

export default CheckboxLabel;
