import { ElementType, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export type InputRootProps = HTMLAttributes<HTMLDivElement> & InputChildProps;

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputChildProps & {
    register?: UseFormRegister<FieldValues>;
  };

export type InputWrapperProps = HTMLAttributes<HTMLDivElement> & InputChildProps;

export type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement> & InputChildProps;

export type InputMessageProps = HTMLAttributes<HTMLParagraphElement> & InputChildProps;

export type InputIconProps = {
  icon: ElementType | string;
  className?: string;
};

export type InputChildProps = {
  required?: boolean;
  type?: 'error' | 'success';
  disabled?: boolean;
};

export type InputOptionsProps = HTMLAttributes<HTMLDivElement> &
  InputChildProps & {
    optionsVisible: boolean;
    options?: { label: string; value: string }[];
    onOption: (option: string) => void;
  };
