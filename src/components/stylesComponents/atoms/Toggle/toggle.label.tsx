import React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';
import clsx from 'clsx';

import { ToggleLabelProps } from './toggle.types';

const ToggleLabel: React.FC<ToggleLabelProps> = ({ id, isDisabled, children, className }) => {
  return (
    <LabelPrimitive.Label
      className={clsx(
        'select-none cursor-pointer',
        {
          'cursor-not-allowed opacity-60': isDisabled,
        },
        className
      )}
      htmlFor={id}
    >
      {children}
    </LabelPrimitive.Label>
  );
};

export default ToggleLabel;
