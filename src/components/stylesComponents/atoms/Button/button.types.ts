import { ButtonHTMLAttributes, ElementType, HTMLAttributes } from 'react';

import { VariantProps } from 'tailwind-variants';

import { buttonVariants } from './button.variants';

export type ButtonContentProps = HTMLAttributes<HTMLSpanElement>;

export type ButtonRootProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { disabled?: boolean; isHidden?: boolean };

export type ButtonIconProps = {
  icon: ElementType | string;
  className?: string;
};
