import { ElementType, HTMLAttributes, ParamHTMLAttributes } from 'react';

import { VariantProps } from 'tailwind-variants';

import { boxInfoIconVariants, boxInfoRootVariants } from './box-info.variants';

export type BoxInfoRootProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxInfoRootVariants> & {
    onClosed?: () => void;
  };

export type BoxInfoMessageProps = ParamHTMLAttributes<HTMLParagraphElement>;

export type BoxInfoIconProps = VariantProps<typeof boxInfoIconVariants> & {
  icon: ElementType | string;
  className?: string;
};

export type BoxInfoType = VariantProps<typeof boxInfoRootVariants>;
