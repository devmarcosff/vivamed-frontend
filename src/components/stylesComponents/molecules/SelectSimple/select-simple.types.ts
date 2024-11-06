import { ButtonHTMLAttributes } from 'react';

import { SelectProps } from '@radix-ui/react-select';

export type SelectSimpleTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  placeholder?: string;
};

export type SelectSimpleRootProps = SelectProps & {
  list: { label?: string; value: string }[];
};
