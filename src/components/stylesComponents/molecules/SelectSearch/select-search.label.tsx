import React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';
import clsx from 'clsx';

import { SelectSearchLabelProps } from './select-search.types';

const SelectSearchLabel: React.FC<SelectSearchLabelProps> = ({ children, className, ...props }) => {
  return (
    <LabelPrimitive.Label className={clsx('block text-body mb-2 select-none', className)} {...props}>
      {children}
    </LabelPrimitive.Label>
  );
};

export default SelectSearchLabel;
