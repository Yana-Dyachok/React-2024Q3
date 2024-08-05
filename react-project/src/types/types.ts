import { Conditions } from './api-interface';
export type Theme = 'light' | 'dark';

export type MainPageProps = {
  initialData: {
    items: Conditions[];
    totalPages: number;
    currentPage: number;
  };
};
