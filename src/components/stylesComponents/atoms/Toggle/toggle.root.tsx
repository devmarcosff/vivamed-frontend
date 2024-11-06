import React from 'react';

import clsx from 'clsx';

import { ToggleChildProps, ToggleRootProps } from './toggle.types';

const ToggleRoot: React.FC<ToggleRootProps> = ({
  children,
  className,
  id = '',
  onCheckedChange,
  isDisabled,
  ...props
}) => {
  const toggleEnhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<ToggleChildProps>(child))
      return React.cloneElement(child, { id, isDisabled, onCheckedChange });
    return child;
  });

  if (!toggleEnhancedChildren) return null;

  return (
    <div className={clsx('flex items-center gap-3', className)} {...props}>
      {toggleEnhancedChildren}
    </div>
  );
};

export default ToggleRoot;
