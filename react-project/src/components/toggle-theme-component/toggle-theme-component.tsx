'use client';
import React from 'react';
import { useTheme } from '../../theme-context/theme-context';
import styles from './toggle-theme-indicator.module.css';

const ToggleThemeComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button
      className={`${styles.toggle} ${
        theme === 'light' ? styles.toggleActive : ''
      }`}
      onClick={handleClick}
    >
      <div
        className={`${styles.indicator} ${
          theme === 'light' ? styles.indicatorActive : ''
        }`}
      ></div>
    </button>
  );
};

export default ToggleThemeComponent;
