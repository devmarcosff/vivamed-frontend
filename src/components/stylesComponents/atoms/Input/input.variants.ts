import clsx from 'clsx';
import { tv } from 'tailwind-variants';

export const containerVariant = tv({
  base: clsx(
    'flex overflow-hidden items-center gap-2 w-full rounded-md border border-allintra-gray-500 bg-allintra-white-50',
    'px-4 has-[input:focus]:border-allintra-primary-500'
  ),
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    type: {
      error: 'border-allintra-error-500 focus:border-allintra-error-500',
      success: 'border-allintra-success-500 focus:border-allintra-success-500',
    },
  },
});

export const inputVariant = tv({
  base: 'w-full py-2 outline-none bg-transparent',
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
    },
    type: {
      error: 'border-allintra-error-500 focus:border-allintra-error-500',
      success: 'border-allintra-success-500 focus:border-allintra-success-500',
    },
  },
});

export const messageVariant = tv({
  base: 'mt-1 font-medium',
  variants: {
    type: {
      error: 'text-allintra-error-500',
      success: 'text-allintra-success-500',
    },
  },
});
