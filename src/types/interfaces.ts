import { Gender } from './enums';
import { UseFormRegister } from 'react-hook-form';

export interface FormDataTemplate {
  name: string;
  age: number | string;
  gender: Gender | string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
  country: string;
}

export interface FormData extends FormDataTemplate {
  img: File | null;
}

export interface FormDataStore extends FormDataTemplate {
  img: string | null;
}

export interface InputProps {
  error: string[];
  text?: string;
  name?: string;
}

interface CheckboxPropsTemplate {
  label: string;
  type: 'radio' | 'checkbox';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export interface CheckboxProps extends CheckboxPropsTemplate {
  refer?: React.ForwardedRef<HTMLInputElement>;
  name: string;
}

export interface CheckboxPropsHooks extends CheckboxPropsTemplate {
  register: UseFormRegister<FormDataStore>;
  name: keyof FormDataStore;
}

export interface InputFormProps extends InputProps {
  name: string;
  type: 'text' | 'number' | 'email';
}

export interface InputFormHookProps {
  error: string[];
  name: keyof FormDataStore;
  register: UseFormRegister<FormDataStore>;
  text?: string;
  type?: string;
}
