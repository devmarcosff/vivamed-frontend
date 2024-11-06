import React from 'react';

import { StatusRootProps } from './status.types';
import { statusVariants } from './status.variants';

const StatusRoot: React.FC<StatusRootProps> = ({ children, type, outline, className, ...props }) => {
  return (
    <div className={statusVariants({ outline, type, className })} {...props}>
      {children}
    </div>
  );
};

export default StatusRoot;
