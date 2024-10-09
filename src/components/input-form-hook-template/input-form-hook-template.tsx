import React from 'react';
import { InputFormHookProps } from '../../types/interfaces';
import styles from '../input.module.scss';

const InputFormHookTemlate: React.FC<InputFormHookProps> = ({
  error,
  text,
  name,
  type,
  register,
  ...rest
}) => {
  return (
    <div className={styles.inputBlock}>
      <div className={styles.inputInner}>
        <label className={styles.label} htmlFor={`input-hook-${name}`}>
          {name[0].toUpperCase() + name.slice(1)}:
        </label>
        <input
          id={`input-hook-${name}`}
          className={`${styles.input} ${error.length > 0 ? styles.borderError : ''}`}
          type={type}
          placeholder={text}
          {...register(name)}
          {...rest}
        />
      </div>
      {error.length > 0 && (
        <div className={styles.errors}>
          {error.map((er) => (
            <p key={`hook-${er}`}>{er}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputFormHookTemlate;
