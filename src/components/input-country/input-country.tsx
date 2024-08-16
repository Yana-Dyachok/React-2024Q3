import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { InputProps } from '../../types/interfaces';
import { CountryState } from '../../store/slices/country-slices';
import styles from '../../components/input.module.scss';

const InputCountry = forwardRef<HTMLInputElement, InputProps>(
  ({ error }, ref) => {
    const countries = useSelector(
      (state: { country: CountryState }) => state.country.countries,
    );

    return (
      <div className={styles.inputBlock}>
        <div className={styles.inputInner}>
          <label htmlFor="country" className={styles.label}>
            Country:
          </label>
          <input
            list="country-list"
            id="country"
            name="country"
            ref={ref}
            className={`${styles.input} ${error.length !== 0 ? styles.borderError : ''}`}
          />
          <datalist id="country-list">
            {countries.map((country: string) => (
              <option key={country} value={country} />
            ))}
          </datalist>
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

export default InputCountry;
