import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import ThemeContext from '../theme-context';
import { Theme, lightTheme } from '../theme';
import styles from './theme-provider.module.css';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme: Theme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );

  const themeClass =
    theme === lightTheme ? styles.lightTheme : styles.darkTheme;

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`${styles.container} ${themeClass}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
