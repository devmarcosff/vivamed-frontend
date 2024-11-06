import { tv } from 'tailwind-variants';

export const boxInfoRootVariants = tv({
  base: 'flex items-center gap-2 p-5 rounded-md',
  variants: {
    type: {
      default: 'bg-allintra-gray-400 border border-allintra-gray-600',
      primary: 'bg-allintra-primary-500/5 border border-allintra-primary-500',
      success: 'bg-allintra-success-50 border border-allintra-success-500',
      error: 'bg-allintra-error-50 border border-allintra-error-500',
      attention: 'bg-allintra-attention-50 border border-allintra-attention-500',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export const boxInfoCloseButtonVariants = tv({
  base: 'p-1 rounded-md',
  variants: {
    type: {
      default: 'text-allintra-gray-600 outline-allintra-gray-600',
      primary: 'text-allintra-primary-500 outline-allintra-primary-500',
      success: 'text-allintra-success-500 outline-allintra-success-500',
      error: 'text-allintra-error-500 outline-allintra-error-500',
      attention: 'text-allintra-attention-500 outline-allintra-attention-500',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export const boxInfoIconVariants = tv({
  base: 'w-6 h-6',
  variants: {
    type: {
      default: 'text-allintra-gray-600',
      primary: 'text-allintra-primary-500',
      success: 'text-allintra-success-500',
      error: 'text-allintra-error-500',
      attention: 'text-allintra-attention-500',
    },
  },
  defaultVariants: {
    type: 'default',
  },
});
