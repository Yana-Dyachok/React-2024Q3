import { forwardRef } from 'react';
import { CheckboxProps } from '../../../types/interfaces';
import styles from './checkbox.module.scss';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ type, label, name, refer, onChange }, ref) => {
    return (
      <div className={styles.checkboxBlock}>
        <input
          className={`${type === 'radio' ? styles.inputRadio : styles.inputCheckbox}`}
          type={type}
          id={label}
          name={name}
          ref={refer || ref}
          value={label}
          onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  },
);

export default Checkbox;
