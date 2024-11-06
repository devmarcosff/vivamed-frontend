import React from 'react';

import clsx from 'clsx';

import { BoxInfoMessageProps } from './box-info.types';

const BoxInfoMessage: React.FC<BoxInfoMessageProps> = ({ children, className }) => {
  return <p className={clsx('flex-1', className)}>{children}</p>;
};

export default BoxInfoMessage;
