import React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { ModalRootProps } from './modal.types';

const ModalRoot: React.FC<ModalRootProps> = ({ children, ...props }) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};

export default ModalRoot;
