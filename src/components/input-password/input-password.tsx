import { forwardRef, useState } from 'react';
import styles from '../input.module.scss';
import { FormData } from '../../types/interfaces';
import { CombinedProps } from '../../types/type';

const InputPassword = forwardRef<HTMLInputElement, CombinedProps>(
  (props, ref) => {
    const { error = [], register, name } = props;

    const inputProps = register
      ? { ...register(name as keyof FormData) }
      : { ref };

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={styles.inputBlock}>
        <div className={styles.inputInner}>
          <label className={styles.label} htmlFor={name}>
            {name === 'password' ? 'Password' : 'Confirm password'}:
          </label>
          <div
            className={`${styles.passwordBlock} ${error.length !== 0 ? styles.borderError : ''}`}
          >
            <input
              id={name}
              type={showPassword ? 'text' : 'password'}
              name={name}
              placeholder="password"
              className={styles.passwordInput}
              tabIndex={1}
              {...inputProps}
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
