import React from 'react';

import clsx from 'clsx';

import { InputMessageProps } from './input.types';
import { messageVariant } from './input.variants';

const InputMessage: React.FC<InputMessageProps> = ({ type, children }) => {
  return <p className={clsx('text-caption', messageVariant({ type }))}>{children}</p>;
};

export default InputMessage;
