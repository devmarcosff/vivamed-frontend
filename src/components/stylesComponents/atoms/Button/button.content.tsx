import React from 'react';

import { ButtonContentProps } from './button.types';

const ButtonContent: React.FC<ButtonContentProps> = ({ children }) => {
  return <span>{children}</span>;
};

export default ButtonContent;
