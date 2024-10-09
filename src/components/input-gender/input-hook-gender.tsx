import React, { useState } from 'react';
import { InputFormHookProps } from '../../types/interfaces';
import { Gender } from '../../types/enums';
import Checkbox from '../ui/checkbox/checkbox';
import styles from './input-gender.module.scss';

const InputHookGender: React.FC<InputFormHookProps> = ({
  error,
  name,
  register,
}) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
  };

  return (
    <div className={styles.inputBlock}>
      <h3 className={styles.title}>Gender:</h3>
      <div className={styles.inputInner}>
        <Checkbox
          {...register(name)}
          label={Gender.Female}
          type="radio"
          onChange={(e) => {
            handleChange(e);
            register(name).onChange(e);
          }}
          checked={selectedGender === Gender.Female}
        />
        <Checkbox
          {...register(name)}
          label={Gender.Male}
          type="radio"
          onChange={(e) => {
            handleChange(e);
            register(name).onChange(e);
          }}
          checked={selectedGender === Gender.Male}
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
};

export default InputHookGender;
