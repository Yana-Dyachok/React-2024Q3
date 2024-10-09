import { forwardRef } from 'react';
import { InputFormProps } from '../../types/interfaces';
import styles from '../input.module.scss';
const InputFormTemlate = forwardRef<HTMLInputElement, InputFormProps>(
  ({ error, text, name, type }, ref) => {
    return (
      <div className={styles.inputBlock}>
        <div className={styles.inputInner}>
          <label className={styles.label} htmlFor={`input-${name}`}>
            {name[0].toLocaleUpperCase() + name.slice(1)}:
          </label>
          <input
            ref={ref}
            id={`input-${name}`}
            name={`input-${name}`}
            className={`${styles.input} ${error.length !== 0 ? styles.borderError : ''}`}
            type={type}
            placeholder={text}
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

export default InputFormTemlate;
