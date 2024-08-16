import { forwardRef, useState } from 'react';
import styles from '../input.module.scss';
import { InputProps } from '../../types/interfaces';

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ error, text }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const idText = text?.[0]?.toLocaleLowerCase() || 'password';
    return (
      <div className={styles.inputBlock}>
        <div className={styles.inputInner}>
          <label className={styles.label} htmlFor={idText}>
            {text}
          </label>
          <div
            className={`${styles.passwordBlock} ${error.length !== 0 ? styles.borderError : ''}`}
          >
            <input
              ref={ref}
              id={idText}
              type={showPassword ? 'text' : 'password'}
              name={idText}
              placeholder="password"
              className={styles.passwordInput}
              tabIndex={1}
            />
            <button
              type="button"
              className={`${styles.passwordEye} ${showPassword ? styles.passwordEyeOpen : styles.passwordEyeClosed}`}
              onClick={togglePasswordVisibility}
            />
          </div>
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

export default InputPassword;
