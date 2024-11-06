import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipContentProps } from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';

const TooltipContent: React.FC<TooltipContentProps> = ({ children, ...props }) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        role="tooltip"
        sideOffset={4}
        className={clsx(
          'animate-slide-up-fade duration-500',
          'inline-flex items-center rounded-md px-4 py-2.5',
          'bg-allintra-black-500 z-50'
        )}
        {...props}
      >
        <TooltipPrimitive.Arrow className="fill-current text-allintra-black-500" />
        <span className="block text-xs leading-none text-gray-100">{children}</span>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

export default TooltipContent;
