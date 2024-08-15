import { Gender } from './enums';
export interface FormData {
  name: string;
  age: number | string;
  gender: Gender | string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
  img: File | null;
  country: string;
}

export interface InputProps {
  error: string;
  text?: string;
}

export interface CheckboxProps {
  name: string;
  label: string;
  type: 'radio' | 'checkbox';
  refer: React.ForwardedRef<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}
