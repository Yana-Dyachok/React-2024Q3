import React from 'react';
import styles from './loading.module.css';

const Loading: React.FC = () => {
  return (
    <section className={styles.rectSpinner}>
      <div className={styles.loadingContainer} role="spiner">
        {[...Array(16)].map((_, index) => (
          <div key={`${index}-rect`} className={styles.rect} />
        ))}
      </div>
    </section>
  );
};

export default Loading;
