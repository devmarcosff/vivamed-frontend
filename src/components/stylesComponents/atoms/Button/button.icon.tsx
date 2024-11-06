import React from 'react';

import clsx from 'clsx';

import { ButtonIconProps } from './button.types';

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon: Icon, className, ...props }) => {
  return (
    <Icon
      className={clsx(
        'group-data-[active=false]:text-allintra-orange-500',
        'group-data-[type="card"]:rounded-full group-data-[type=card]:p-2',
        'group-data-[type=card]:w-9 group-data-[type=card]:h-9',
        'group-data-[type=card]:bg-allintra-gray-400 group-data-[type=card]:text-allintra-orange-500',
        className
      )}
      {...props}
    />
  );
};

export default ButtonIcon;
