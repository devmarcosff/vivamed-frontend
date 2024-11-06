import { HTMLAttributes } from 'react';

import { CheckboxProps } from '@radix-ui/react-checkbox';
import { LabelProps } from '@radix-ui/react-label';

export type CheckboxRootProps = HTMLAttributes<HTMLDivElement> & CheckboxChildProps;

export type CheckboxLabelProps = LabelProps & CheckboxChildProps;

export type CheckboxControlProps = CheckboxProps & CheckboxChildProps;

export type CheckboxChildProps = {
  disabled?: boolean;
};
