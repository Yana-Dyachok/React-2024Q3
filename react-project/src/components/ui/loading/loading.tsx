import React from 'react';
import { RootState } from '../../../redux/store/store';
import { lightTheme } from '../../../redux/toggle-theme/theme';
import { useSelector } from 'react-redux';
import styles from './loading.module.css';

const Loading: React.FC = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;
  return (
    <section className={styles.loaderContainer}>
      <div className={`${styles.loader} ${themeClass} `} role="loader"></div>
    </section>
  );
};

export default Loading;
