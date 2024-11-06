import { HTMLAttributes } from 'react';

export type ToggleRootProps = HTMLAttributes<HTMLDivElement> & ToggleChildProps;

export type ToggleContentProps = HTMLAttributes<HTMLButtonElement> & ToggleChildProps;

export type ToggleLabelProps = HTMLAttributes<HTMLLabelElement> & ToggleChildProps;

export type ToggleChildProps = {
  id?: string;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  isDisabled?: boolean;
};
