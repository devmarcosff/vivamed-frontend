import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipProps } from '@radix-ui/react-tooltip';

const TooltipRoot: React.FC<TooltipProps> = ({ children, ...props }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default TooltipRoot;
