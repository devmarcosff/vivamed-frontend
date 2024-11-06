import React from 'react';

import { BoxInfoIconProps } from './box-info.types';
import { boxInfoIconVariants } from './box-info.variants';

const BoxInfoIcon: React.FC<BoxInfoIconProps> = ({ icon: Icon, type, className, ...props }) => {
  return <Icon className={boxInfoIconVariants({ type, className })} {...props} />;
};

export default BoxInfoIcon;
