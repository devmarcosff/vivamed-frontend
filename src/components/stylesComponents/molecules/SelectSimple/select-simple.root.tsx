import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { clsx } from 'clsx';

import { FaCheck } from 'react-icons/fa';
import { SelectSimpleRootProps } from './select-simple.types';

const SelectSimpleRoot: React.FC<SelectSimpleRootProps> = ({ children, onValueChange, list, ...props }) => {
  const handleSelectValue = (value: string) => {
    onValueChange?.(value);
  };

  return (
    <SelectPrimitive.Root onValueChange={handleSelectValue} {...props}>
      {children}

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="z-50">
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center ">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="bg-white p-2 rounded-lg shadow-lg left-5">
            <SelectPrimitive.Group>
              {list.map((itemList, index) => (
                <SelectPrimitive.Item
                  key={`${itemList}-${index}`}
                  value={itemList.value.toLowerCase()}
                  className={clsx(
                    'relative flex items-center px-8 py-2 rounded-md focus:bg-allintra-gray-400',
                    'focus:outline-none select-none'
                  )}
                >
                  <SelectPrimitive.ItemText>{itemList.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <FaCheck />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default SelectSimpleRoot;
