import React from 'react';

import clsx from 'clsx';

import { InputIconProps } from './input.types';

const InputIcon: React.FC<InputIconProps> = ({ icon: Icon, className, ...props }) => {
  return <Icon className={clsx('w-5 h-5', className)} {...props} />;
};

export default InputIcon;
