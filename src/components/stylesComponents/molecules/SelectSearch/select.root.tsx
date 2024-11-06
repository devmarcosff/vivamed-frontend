import { startTransition, useEffect, useMemo, useState } from 'react';

import { Combobox, ComboboxItem, ComboboxList, ComboboxProvider } from '@ariakit/react';
import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { matchSorter } from 'match-sorter';

import { Loading } from '../../atoms/Loading';

import { BsSearch } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { SelectSearchRootProps } from './select-search.types';

const SelectSearchRoot: React.FC<SelectSearchRootProps> = ({
  list = [],
  placeholder,
  onValueChange,
  defaultValue,
  children,
  className,
  isLoading,
  emptyMessage,
  hasValueChange = true,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? '');
  const [searchValue, setSearchValue] = useState('');

  const matches = useMemo(() => {
    if (!searchValue) return list;
    const keys = ['label', 'value'];
    const matches = matchSorter(list, searchValue, { keys });

    const selectedList = list.find((itemList) => itemList.value === value);

    if (selectedList && !matches.includes(selectedList)) matches.push(selectedList);
    return matches;
  }, [searchValue, value, list]);

  const handleSelectValue = (value: string) => {
    const selectedItem = matches.find((item) => item.value === value);
    if (hasValueChange) setValue(value);
    onValueChange?.(selectedItem);
  };

  useEffect(() => {
    setSearchValue('');
  }, [list]);

  useEffect(() => {
    if (defaultValue) handleSelectValue(defaultValue);
  }, [defaultValue, isLoading]);

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={handleSelectValue}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
    >
      {children}

      <SelectPrimitive.Portal>
        <ComboboxProvider
          open={open}
          setOpen={setOpen}
          resetValueOnHide
          includesBaseElement={false}
          setValue={(value) => {
            startTransition(() => {
              setSearchValue(value);
            });
          }}
        >
          <SelectPrimitive.Content
            aria-label="Buscar"
            position="popper"
            className={clsx(
              'radix-select-content',
              'overflow-hidden z-50 rounded-lg max-h-72',
              'bg-white border border-allintra-gray-500',
              className
            )}
            sideOffset={4}
          >
            <div className="relative flex items-center p-1 pb-0">
              <div
                className={clsx(
                  'peer px-2 flex gap-2 items-center h-10 rounded outline-none sm:h-9 flex-1',
                  'bg-allintra-white-50 text-allintra-gray-700 border',
                  { 'border-allintra-primary-500': !!searchValue }
                )}
              >
                <Combobox
                  autoSelect
                  placeholder={placeholder ?? 'Buscar'}
                  className={clsx('appearance-none outline-none flex-1')}
                  onBlurCapture={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                />
                <div
                  className={clsx('pointer-events-none text-allintra-gray-700', {
                    '!text-allintra-primary-500': !!searchValue,
                  })}
                >
                  <BsSearch />
                </div>
              </div>
            </div>
            <Loading.Root isLoading={isLoading} loadClass="mx-auto my-2">
              <ComboboxList className="overflow-y-auto p-1 w-full">
                {matches.length === 0 && (
                  <span className="text-center text-allintra-gray-700 block">{emptyMessage ?? 'No items found.'}</span>
                )}

                {matches.map(({ label, value }, index) => (
                  <SelectPrimitive.Item
                    key={value + index}
                    value={value}
                    asChild
                    className={clsx(
                      'relative flex flex-1 items-center rounded pl-7 pr-7 min-h-10 sm:min-h-9 w-full min-w-fit',
                      'text-body cursor-default',
                      'data-[active-item]:bg-allintra-gray-400'
                    )}
                  >
                    <ComboboxItem>
                      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
                      <SelectPrimitive.ItemIndicator className="absolute left-1.5">
                        <FaCheck />
                      </SelectPrimitive.ItemIndicator>
                    </ComboboxItem>
                  </SelectPrimitive.Item>
                ))}
              </ComboboxList>
            </Loading.Root>
          </SelectPrimitive.Content>
        </ComboboxProvider>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default SelectSearchRoot;
