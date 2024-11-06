import React from 'react';

import clsx from 'clsx';

import { CircleBadgeProps } from './circle-badge.types';

const CircleBadge: React.FC<CircleBadgeProps> = ({ value, className }) => {
  if (!value) return null;

  const textLength = value.toString().length;
  const size = Math.max(22, textLength * 10);

  return (
    <div
      className={clsx(
        'min-w-6 min-h-6 max-w-8 max-h-8 rounded-full flex items-center',
        'justify-center text-caption font-bold line-clamp-1',
        'text-allintra-white-50 bg-allintra-attention-500',
        className
      )}
      style={{ width: size, height: size }}
    >
      {value}
    </div>
  );
};

export default CircleBadge;
