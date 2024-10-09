import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { CountryState } from '../../store/slices/country-slices';
import { CombinedProps } from '../../types/type';
import styles from '../../components/input.module.scss';

const InputCountry = forwardRef<HTMLInputElement, CombinedProps>(
  (props, ref) => {
    const countries = useSelector(
      (state: { country: CountryState }) => state.country.countries,
    );

    const { error = [], register, name = 'country' } = props;

    const inputProps = register ? { ...register(name) } : { ref };

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
            {...inputProps}
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
