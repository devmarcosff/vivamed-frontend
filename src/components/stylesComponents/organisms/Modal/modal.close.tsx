import * as DialogPrimitive from '@radix-ui/react-dialog';

import { ModalCloseProps } from './modal.types';

const ModalClose: React.FC<ModalCloseProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Close aria-label="Fechar modal" {...props}>
      {children}
    </DialogPrimitive.Close>
  );
};

export default ModalClose;
