'use client';
import { createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = () => {
  const contextTheme = useContext(ThemeContext);

  if (contextTheme === undefined) {
    throw new Error('error of useTheme');
  }
  return contextTheme;
};
