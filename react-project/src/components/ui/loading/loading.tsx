import React from 'react';
import { useTheme } from '../../../theme-context/theme-context';
import styles from './loading.module.css';

const Loading: React.FC = () => {
  const { theme } = useTheme();
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;
  return (
    <section className={styles.loaderContainer}>
      <div className={`${styles.loader} ${themeClass} `} role="loader"></div>
    </section>
  );
};

export default Loading;
