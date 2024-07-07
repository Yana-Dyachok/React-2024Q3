import React from 'react';
import styles from './loading.module.css';

class Loading extends React.Component {
  render() {
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
  }
}

export default Loading;
