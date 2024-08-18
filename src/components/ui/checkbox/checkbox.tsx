import { forwardRef } from 'react';
import { CheckboxPropsHooks, CheckboxProps } from '../../../types/interfaces';
import styles from './checkbox.module.scss';

const Checkbox = forwardRef<
  HTMLInputElement,
  CheckboxProps & Partial<CheckboxPropsHooks>
>(({ type, label, name, refer, onChange, register, checked }, ref) => {
  const inputProps = register ? { ...register(name) } : { ref: refer || ref };

  return (
    <div className={styles.checkboxBlock}>
      <input
        className={`${type === 'radio' ? styles.inputRadio : styles.inputCheckbox}`}
        type={type}
        id={label}
        name={name}
        value={label}
        onChange={onChange}
        checked={checked}
        {...inputProps}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
});

export default Checkbox;
