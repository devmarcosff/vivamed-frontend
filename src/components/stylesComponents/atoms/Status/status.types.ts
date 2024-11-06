import { ElementType, HTMLAttributes } from 'react';

import { VariantProps } from 'tailwind-variants';

import { statusVariants } from './status.variants';

export type StatusRootProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof statusVariants>;

export type StatusTextProps = HTMLAttributes<HTMLSpanElement>;

export type StatusIconProps = {
  icon: ElementType | string;
  className?: string;
};

export type StatusType = VariantProps<typeof statusVariants>;
