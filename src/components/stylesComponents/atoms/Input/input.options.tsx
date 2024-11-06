import React from 'react';

import clsx from 'clsx';

import { InputOptionsProps } from './input.types';

const InputOptions: React.FC<InputOptionsProps> = ({ optionsVisible, options, onOption, className }) => {
  if (optionsVisible && !!options?.length && options[0].label !== '')
    return (
      <div
        className={clsx(
          'absolute border w-full mt-1 rounded-lg shadow-md max-h-60 overflow-y-auto z-10 left-0',
          'bg-white border-gray-300',
          className
        )}
      >
        {options?.map((option, index) => (
          <div
            key={option.value + index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onMouseDown={() => onOption(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    );

  return null;
};

export default InputOptions;
