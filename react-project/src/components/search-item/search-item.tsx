import React from 'react';
import { Conditions } from '../../types/api-interface';
import { useNavigate } from '@remix-run/react';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleComplete,
  makeSelectIsCompleted,
} from '@/lib/slices/checked-item-slice';
import { useTheme } from '../../theme-context/theme-context';
import styles from './search-item.module.css';

interface SearchItemProps {
  condition: Conditions;
}

const SearchItem: React.FC<SearchItemProps> = ({ condition }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  const isCompleted = useSelector((state: RootState) =>
    makeSelectIsCompleted(condition.uid)(state),
  );

  const handleCheckboxChange = () => {
    dispatch(toggleComplete({ condition }));
  };

  const removeItemIdFromQuery = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('itemId');
    return urlParams.toString();
  };

  const handleDetailsClick = () => {
    const newQuery = removeItemIdFromQuery();
    navigate(`/item/${condition.uid}?${newQuery}`);
  };

  return (
    <div
      className={`${styles.conditionBlock} ${themeClass}`}
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
        <button
          className={`${styles.detailsLink} ${themeClass}`}
          onClick={handleDetailsClick}
        >
          details
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
