import Button from '../../components/ui/button/button';
import { RootState } from '../../redux/store/store';
import { lightTheme } from '../../redux/toggle-theme/theme';
import { useSelector } from 'react-redux';
import styles from './not-found.module.css';

function NotFoundPage() {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;
  return (
    <div className={styles.errorBlock}>
      <h1 className={styles.title}> Ooops... Page not found</h1>
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
      <Button btnType="button" to="/React-2024Q3/?page=1">
        Back to main
      </Button>
    </div>
  );
}

export default NotFoundPage;
