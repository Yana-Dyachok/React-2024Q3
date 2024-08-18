import React from 'react';
import styles from '../input.module.scss';
import { convertToBase64 } from '../../utils/const/convert-img';
import { InputFormHookProps } from '../../types/interfaces';

const ImgInputHook: React.FC<InputFormHookProps> = ({
  error,
  name,
  register,
}) => {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const file = fileList?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      if (onChange) {
        onChange({
          target: {
            name,
            value: base64,
          },
        });
      }
    }
  };

  const { onChange, ...inputProps } = register(name);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    onChange(event);
  };

  return (
    <div className={styles.inputBlock}>
      <label htmlFor={`input-${name}`} className={styles.label}>
        Image:
      </label>
      <input
        id={`input-${name}`}
        type="file"
        accept="image/png, image/jpeg"
        className={`${styles.input} ${error.length !== 0 ? styles.borderError : ''}`}
        onChange={handleFileChange}
        {...inputProps}
      />
      {error && (
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
