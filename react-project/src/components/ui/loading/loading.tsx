import { Component } from 'react';
import styles from './loading.module.css';

class Loading extends Component {
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
