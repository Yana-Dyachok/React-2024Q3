import Link from 'next/link';
import { RootState } from '../redux/store/store';
import { lightTheme } from '../redux/toggle-theme/theme';
import { useSelector } from 'react-redux';
import styles from './not-found.module.css';

const NotFoundPage = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;

  return (
    <div className={styles.errorBlock}>
      <h1 className={styles.title}>Ooops... Page not found</h1>
      <section className={styles.errorContainer}>
        <span className={`${styles.spanError} ${themeClass}`}>
          <span className={styles.digitFirst}>4</span>
        </span>
        <span
          className={`${styles.spanError} ${styles.digitSecond} ${themeClass}`}
        >
          0
        </span>
        <span className={`${styles.spanError} ${themeClass}`}>
          <span className={styles.digitThird}>4</span>
        </span>
      </section>
      <Link href="/">
        <a className={styles.button}>Back to main</a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
