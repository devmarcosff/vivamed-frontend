import { HTMLAttributes } from 'react';

import { DialogCloseProps, DialogContentProps, DialogProps, DialogTriggerProps } from '@radix-ui/react-dialog';

export type ModalRootProps = DialogProps;

export type ModalContentProps = DialogContentProps & HTMLAttributes<HTMLDivElement>;

export type ModalTriggerProps = DialogTriggerProps;

export type ModalCloseProps = DialogCloseProps;
