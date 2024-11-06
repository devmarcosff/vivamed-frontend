import clsx from 'clsx';
import { tv } from 'tailwind-variants';

export const statusVariants = tv({
  base: clsx('inline-flex items-center gap-2 px-3 py-1 rounded-full !font-medium !text-caption'),
  variants: {
    type: {
      default: clsx('bg-allintra-gray-400 text-allintra-gray-700 border border-allintra-gray-500/50'),
      primary: clsx('bg-allintra-primary-500/5 text-allintra-primary-500 border border-allintra-primary-500/10'),
      success: clsx('bg-allintra-success-50 text-allintra-success-500 border border-allintra-success-500/20'),
      error: clsx('bg-allintra-error-50 text-allintra-error-500 border border-allintra-error-500/10'),
      attention: clsx('bg-allintra-attention-50 text-allintra-attention-500 border border-allintra-attention-500/10'),
      info: clsx('bg-blue-50 text-blue-400 border border-blue-400/30'),
      topper: clsx('text-allintra-white-50 bg-gradient-to-b from-orange-500 to-pink-600'),
    },
    outline: {
      true: clsx('!bg-transparent'),
    },
  },
  defaultVariants: {
    type: 'default',
  },
});
