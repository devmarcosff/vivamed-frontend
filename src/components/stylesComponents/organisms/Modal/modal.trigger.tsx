import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';

import { ModalTriggerProps } from './modal.types';

const ModalTrigger: React.FC<ModalTriggerProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Trigger
      asChild
      aria-label="Abrir Modal"
      className={clsx('data-[state=open]:pointer-events-none select-none', className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Trigger>
  );
};

export default ModalTrigger;
