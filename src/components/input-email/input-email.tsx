import { forwardRef } from 'react';
import styles from '../input.module.scss';
import { InputProps } from '../../types/interfaces';

const InputEmail = forwardRef<HTMLInputElement, InputProps>(
  ({ error }, ref) => {
    return (
      <div className={styles.inputBlock}>
        <div className={styles.inputInner}>
          <label className={styles.label} htmlFor="input-email">
            Email:
          </label>
          <input
            ref={ref}
            id="input-email"
            name="input-email"
            className={`${styles.input} ${error.length !== 0 ? styles.borderError : ''}`}
            type="text"
            placeholder="user@example.com"
            tabIndex={1}
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
  },
);

export default InputEmail;
