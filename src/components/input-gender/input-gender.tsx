import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { InputProps } from '../../types/interfaces';
import { Gender } from '../../types/enums';
import Checkbox from '../ui/checkbox/checkbox';
import styles from './input-gender.module.scss';

export type InputGenderRef = {
  maleRef: HTMLInputElement | null;
  femaleRef: HTMLInputElement | null;
  getValue: () => string | null;
};

const InputGender = forwardRef<InputGenderRef, InputProps>(({ error }, ref) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const maleRef = React.createRef<HTMLInputElement>();
  const femaleRef = React.createRef<HTMLInputElement>();

  useImperativeHandle(ref, () => ({
    maleRef: maleRef.current,
    femaleRef: femaleRef.current,
    getValue: () => selectedGender,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
  };

  return (
    <div className={styles.inputBlock}>
      <h3 className={styles.title}>Gender:</h3>
      <div className={styles.inputInner}>
        <Checkbox
          name="gender"
          label={Gender.Female}
          type="radio"
          refer={femaleRef}
          onChange={handleChange}
          checked={selectedGender === Gender.Female}
        />
        <Checkbox
          name="gender"
          label={Gender.Male}
          type="radio"
          refer={maleRef}
          onChange={handleChange}
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
});

export default InputGender;
