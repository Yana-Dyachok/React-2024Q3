import styles from './loading.module.css';

const Loading = () => {
  return (
    <section className={styles.rectSpinner}>
      <div className={styles.loadingContainer}>
        {[...Array(16)].map((_, index) => (
          <div key={`${index}-rect`} className={styles.rect} />
        ))}
      </div>
    </section>
  );
};

export default Loading;
