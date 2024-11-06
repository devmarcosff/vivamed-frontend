import { ButtonHTMLAttributes, HTMLAttributes, LabelHTMLAttributes } from 'react';

export type SelectSearchTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  placeholder?: string;
  isLoading?: boolean;
};

export type SelectSearchLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export type SelectSearchRootProps = HTMLAttributes<HTMLDivElement> & {
  list?: { label: string; value: string; values?: object }[];
  onValueChange?: (value?: { label: string; value: string; values?: object }) => void;
  placeholder?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  hasValueChange?: boolean;
  defaultValue?: string;
  disabled?: boolean;
};
