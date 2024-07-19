import React from 'react';
import { Conditions } from '../../types/api-interface';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from '../../app/store/store';
import { lightTheme } from '../../toggle-theme/theme';
import { useSelector } from 'react-redux';
import styles from './search-item.module.css';

interface SearchItemProps {
  condition: Conditions;
}

const SearchItem: React.FC<SearchItemProps> = ({ condition }) => {
  const [searchParams] = useSearchParams();
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;
  return (
    <Link
      className={`${styles.conditionBlock} ${themeClass}`}
      key={condition.uid}
      to={`item/${condition.uid}?${searchParams}`}
      onClick={(event) => event.stopPropagation()}
    >
      <span className={`${styles.name} ${themeClass}`}>{condition.name}</span>
      <div
        className={`${styles.condition} ${themeClass}} ${
          condition.psychologicalCondition ? '' : styles.notCondition
        }`}
      ></div>
    </Link>
  );
};

export default SearchItem;
