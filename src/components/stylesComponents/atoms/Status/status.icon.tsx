import React from 'react';

import clsx from 'clsx';

import { StatusIconProps } from './status.types';

const StatusIcon: React.FC<StatusIconProps> = ({ icon: Icon, className, ...props }) => {
  return <Icon className={clsx('w-[5px] h-[5px]', className)} {...props} />;
};

export default StatusIcon;
