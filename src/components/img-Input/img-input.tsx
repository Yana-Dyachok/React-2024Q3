import { forwardRef } from 'react';
import styles from '../input.module.scss';
import { InputProps } from '../../types/interfaces';

const ImgInput = forwardRef<HTMLInputElement, InputProps>(({ error }, ref) => (
  <div className={styles.inputBlock}>
    <label htmlFor="input-img" className={styles.label}>
      Image:
    </label>
    <input
      ref={ref}
      id="input-img"
      name="img"
      type="file"
      accept="image/png, image/jpeg"
      className={`${styles.input} ${error.length !== 0 ? styles.borderError : ''}`}
    />
    {error && <div className={styles.errors}>{error}</div>}
  </div>
));

export default ImgInput;
