import React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';
import { FaCheck } from 'react-icons/fa';
import { CheckboxControlProps } from './checkbox.types';

const CheckboxControl = React.forwardRef<HTMLButtonElement, CheckboxControlProps>(
  ({ id, className, defaultChecked, checked, onCheckedChange, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={clsx(
          'flex h-5 w-5 items-center justify-center rounded',
          'aria-checked:bg-allintra-primary-500 bg-allintra-white-50 border border-allintra-gray-500',
          'focus:outline-none focus-visible:ring-[2px] focus-visible:ring-allintra-primary-500 focus-visible:ring-opacity-75',
          'disabled:bg-allintra-gray-500 disabled:border-2 disabled:cursor-not-allowed',
          { 'disabled:p-[9px]': checked ?? defaultChecked },
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <FaCheck className="p-[2px] self-center text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

export default CheckboxControl;
