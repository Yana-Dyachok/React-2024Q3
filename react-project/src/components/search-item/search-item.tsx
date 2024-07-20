import React from 'react';
import { Conditions } from '../../types/api-interface';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from '../../app/store/store';
import { lightTheme } from '../../toggle-theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete } from '../../app/slices/checked-item-slice';
import styles from './search-item.module.css';

interface SearchItemProps {
  condition: Conditions;
}

const SearchItem: React.FC<SearchItemProps> = ({ condition }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;

  const isCompleted = useSelector(
    (state: RootState) =>
      state.checked.checkedItem[condition.uid]?.checked || false,
  );

  const handleCheckboxChange = () => {
    dispatch(toggleComplete({ condition: condition }));
  };

  return (
    <div
      className={`${styles.conditionBlock} ${themeClass}`}
      key={condition.uid}
      onClick={(event) => event.stopPropagation()}
    >
      <input
        className={`${styles.inputCheckbox} ${themeClass}`}
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <span className={`${styles.name} ${themeClass}`}>{condition.name}</span>
      <div className={styles.itemFooter}>
        <div
          className={`${styles.condition} ${themeClass} ${
            condition.psychologicalCondition ? '' : styles.notCondition
          }`}
        ></div>
        <Link
          className={`${styles.detailsLink} ${themeClass}`}
          key={condition.uid}
          to={`item/${condition.uid}?${searchParams}`}
        >
          details
        </Link>
      </div>
    </div>
  );
};

export default SearchItem;
