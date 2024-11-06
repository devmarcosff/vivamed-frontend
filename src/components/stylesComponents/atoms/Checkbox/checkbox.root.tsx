import React from 'react';

import { CheckboxChildProps, CheckboxRootProps } from './checkbox.types';

const CheckboxRoot: React.FC<CheckboxRootProps> = ({ children, disabled, ...props }) => {
  const checkBoxEnhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<CheckboxChildProps>(child)) return React.cloneElement(child, { disabled });
    return child;
  });

  if (!checkBoxEnhancedChildren) return null;

  return (
    <div className="flex items-center gap-2" {...props}>
      {checkBoxEnhancedChildren}
    </div>
  );
};

export default CheckboxRoot;
