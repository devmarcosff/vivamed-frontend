import React from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';

import { Loading } from '../../atoms/Loading';

import { IoIosArrowDown } from 'react-icons/io';
import { SelectSearchTriggerProps } from './select-search.types';

const SelectSearchTrigger: React.FC<SelectSearchTriggerProps> = ({ className, isLoading, placeholder }) => {
  return (
    <SelectPrimitive.Trigger
      id="test"
      aria-label="Select item"
      className={clsx(
        'flex w-full h-10 items-center justify-between gap-1 rounded px-4 sm:h-9 sm:text-[15px]',
        'bg-white text-start border border-allintra-gray-500',
        'hover:bg-allintra-gray-400 outline-allintra-primary-500',
        className
      )}
    >
      <span className="!line-clamp-1">
        <Loading.Root isLoading={isLoading} loadClass="!w-4 !h-4">
          <SelectPrimitive.Value placeholder={placeholder ?? 'Select an item'} />
        </Loading.Root>
      </span>
      <SelectPrimitive.Icon className="translate-x-1 text-allintra-gray-700">
        <IoIosArrowDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export default SelectSearchTrigger;
