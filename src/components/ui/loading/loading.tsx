import React from 'react';
import styles from './loading.module.scss';

const Loading: React.FC = () => {
  return (
    <section className={styles.loaderContainer}>
      <div className={styles.loader} role="loader"></div>
    </section>
  );
};

export default Loading;
