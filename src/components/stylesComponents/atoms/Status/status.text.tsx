import React from 'react';

import { StatusTextProps } from './status.types';

const StatusText: React.FC<StatusTextProps> = ({ children, className, ...props }) => {
  return <span {...props}>{children}</span>;
};

export default StatusText;
