import React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';

import CloseIcon from '../../../../assets/close-icon.svg';

import { ModalContentProps } from './modal.types';

const ModalContent: React.FC<ModalContentProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Close asChild>
        <DialogPrimitive.Overlay className={clsx('fixed inset-0 z-20 animate-fadeIn', 'bg-black/50 ')} />
      </DialogPrimitive.Close>

      <DialogPrimitive.Content
        onInteractOutside={(event) => event.preventDefault()}
        className={clsx(
          'fixed z-50 flex flex-col p-10',
          'w-[95vw] max-w-md rounded-lg md:w-full',
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'bg-allintra-gray-300 animate-fadeIn',
          className
        )}
        {...props}
      >
        <DialogPrimitive.Close
          className={clsx('flex self-end items-center rounded-md w-8 h-8 p-2', 'outline-allintra-primary-500')}
        >
          <CloseIcon className="w-5 h-5" />
        </DialogPrimitive.Close>

        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export default ModalContent;
