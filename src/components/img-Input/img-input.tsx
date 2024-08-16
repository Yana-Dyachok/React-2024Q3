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
      name="image"
      type="file"
      accept="image/png, image/jpeg"
      className={`${styles.input} ${error.length !== 0 ? styles.borderError : ''}`}
    />
    {error && (
      <div className={styles.errors}>
        {error.map((er) => (
          <p key={er}>{er}</p>
        ))}
      </div>
    )}
  </div>
));

export default ImgInput;
