import React from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';

import { IoIosArrowDown } from 'react-icons/io';
import { SelectSimpleTriggerProps } from './select-simple.types';

const SelectSimpleTrigger: React.FC<SelectSimpleTriggerProps> = ({ className, placeholder }) => {
  return (
    <SelectPrimitive.Trigger
      aria-label="Select item"
      className={clsx(
        'flex w-auto max-w-72 h-10 items-center justify-between gap-1 rounded px-4 sm:h-9 sm:text-[15px]',
        'bg-white text-start border border-allintra-gray-500',
        'hover:bg-allintra-gray-400 outline-allintra-primary-500',
        className
      )}
    >
      <span className="!line-clamp-1">
        <SelectPrimitive.Value placeholder={placeholder ?? 'Select a item'} />
      </span>
      <SelectPrimitive.Icon className="translate-x-1 text-allintra-gray-700">
        <IoIosArrowDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export default SelectSimpleTrigger;
