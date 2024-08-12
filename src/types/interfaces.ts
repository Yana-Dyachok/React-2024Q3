import { Gender } from './enums';
export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  acceptTerms: boolean;
  picture: FileData;
  country: string;
}

export interface FileData {
  base64: string;
  size: number;
  extension: 'png' | 'jpeg';
}

export interface InputProps {
  error: string;
}
