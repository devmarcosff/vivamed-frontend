import { useEffect, useState } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';

import { ToggleContentProps } from './toggle.types';

const ToggleContent: React.FC<ToggleContentProps> = ({
  children,
  onCheckedChange,
  className,
  id,
  checked,
  isDisabled,
  ...props
}) => {
  const [state, setState] = useState(checked);

  const handleCheckedChange = (checked: boolean): void => {
    onCheckedChange?.(checked);
    setState(checked);
  };

  useEffect(() => {
    setState(checked);
  }, [checked]);

  return (
    <SwitchPrimitive.Root
      id={id}
      checked={state}
      onCheckedChange={handleCheckedChange}
      disabled={isDisabled}
      className={clsx(
        'group disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-allintra-gray-600 aria-checked:bg-allintra-primary-500',
        'relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full',
        'border-2 border-transparent transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring-[2px] focus-visible:ring-allintra-primary-500 focus-visible:ring-opacity-75',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={clsx(
          'group-aria-checked:translate-x-5',
          'translate-x-0',
          'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0',
          'transition duration-200 ease-in-out'
        )}
      />
    </SwitchPrimitive.Root>
  );
};

export default ToggleContent;
