import styles from './loading.module.css';

const Loading = () => {
  return (
    <section className={styles.rectSpinner}>
      <div className={styles.loadingContainer}>
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
        <div className={styles.rect} />
      </div>
    </section>
  );
};

export default Loading;
