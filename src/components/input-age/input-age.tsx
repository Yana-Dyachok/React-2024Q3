import { forwardRef } from 'react';
import styles from '../input.module.scss';
import { InputProps } from '../../types/interfaces';

const InputAge = forwardRef<HTMLInputElement, InputProps>(({ error }, ref) => {
  return (
    <div className={styles.inputBlock}>
      <div className={styles.inputInner}>
        <label className={styles.label} htmlFor="input-age">
          Age:
        </label>
        <input
          ref={ref}
          id="input-age"
          name="input-age"
          className={`${styles.input} ${error.length !== 0 ? styles.borderError : ''}`}
          type="number"
        />
      </div>
      {error && (
        <div className={styles.errors}>
          {error.map((er) => (
            <p key={er}>{er}</p>
          ))}
        </div>
      )}
    </div>
  );
});

export default InputAge;
