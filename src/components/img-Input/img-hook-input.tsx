import React from 'react';
import styles from '../input.module.scss';
import { InputFormHookProps } from '../../types/interfaces';

const ImgInputHook: React.FC<InputFormHookProps> = ({
  error,
  name,
  register,
}) => {
  return (
    <div className={styles.inputBlock}>
      <label htmlFor={`input-${name}`} className={styles.label}>
        Image:
      </label>
      <input
        id={`input-${name}`}
        type="file"
        accept="image/png, image/jpeg"
        multiple={false}
        className={`${styles.input} ${error.length > 0 ? styles.borderError : ''}`}
        required
        {...register(name)}
      />
      {error.length > 0 && (
        <div className={styles.errors}>
          {error.map((er) => (
            <p key={er}>{er}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImgInputHook;
