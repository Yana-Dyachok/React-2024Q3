import Button from '../../components/ui/button/button';
import styles from './not-found.module.scss';

export const handle = { hidePath: true };

function NotFoundPage() {
  return (
    <div className={styles.errorBlock}>
      <h1 className={styles.title}> Ooops... Page not found</h1>
      <section className={styles.errorContainer}>
        <span className={styles.spanError}>
          <span className={styles.digitFirst}>4</span>
        </span>
        <span className={`${styles.spanError} ${styles.digitSecond}`}>0</span>
        <span className={styles.spanError}>
          <span className={styles.digitThird}>4</span>
        </span>
      </section>
      <Button btnType="button" to="/">
        Back to main
      </Button>
    </div>
  );
}

export default NotFoundPage;
