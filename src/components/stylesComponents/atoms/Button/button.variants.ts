import clsx from 'clsx';
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: clsx('py-2 px-4 min-h-14 rounded-full !text-button flex items-center gap-3', 'outline-allintra-primary-500'),
  variants: {
    variant: {
      primary: clsx(
        'bg-allintra-primary-500 text-allintra-white-50',
        'hover:bg-allintra-primary-700',
        'disabled:bg-allintra-gray-500 disabled:text-allintra-gray-700 disabled:cursor-not-allowed'
      ),
      secondary: clsx(
        'bg-allintra-gray-400 text-allintra-primary-500 border',
        'hover:bg-allintra-gray-400 hover:border-allintra-primary-500',
        'disabled:bg-allintra-gray-500 disabled:text-allintra-gray-700',
        'disabled:border-transparent disabled:cursor-not-allowed'
      ),
      outline: clsx(
        'bg-transparent text-allintra-primary-500 border border-allintra-primary-500',
        'hover:bg-allintra-primary-50 hover:border-allintra-primary-700 hover:text-allintra-primary-700',
        'disabled:border-allintra-gray-500 disabled:text-allintra-gray-700',
        'disabled:bg-transparent disabled:cursor-not-allowed'
      ),
      sidebar: clsx(
        'bg-transparent group border border-transparent !text-body hover:border-allintra-orange-500',
        'data-[active=true]:bg-allintra-black-500 data-[active=true]:text-allintra-white-50',
        'data-[active=true]:hover:bg-zinc-800 data-[active=true]:hover:border-zinc-800',
        'disabled:text-allintra-gray-700 hover:disabled:border-transparent',
        'disabled:bg-transparent disabled:cursor-not-allowed',
        'outline-allintra-orange-500'
      ),
      card: clsx('group items-center p-5 rounded-md shadow-sm flex-1 whitespace-nowrap', 'bg-allintra-white-50'),
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
