import { ReactNode, useMemo, useState } from 'react';
import { ThemeContext } from './theme-context';
import styles from './theme-provider.module.css';
type Theme = 'dark' | 'light';

type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  const themeClass =
    value.theme === 'light' ? styles.lightTheme : styles.darkTheme;
  return (
    <ThemeContext.Provider value={value}>
      <div className={`${styles.container} ${themeClass}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
