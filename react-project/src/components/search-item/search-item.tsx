import React from 'react';
import { Conditions } from '../../api/api-interface';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './search-item.module.css';

interface SearchItemProps {
  condition: Conditions;
}

const SearchItem: React.FC<SearchItemProps> = ({ condition }) => {
  const [searchParams] = useSearchParams();
  return (
    <Link
      className={styles.conditionBlock}
      key={condition.uid}
      to={`item/${condition.uid}?${searchParams}`}
      onClick={(event) => event.stopPropagation()}
    >
      <span className={styles.name}>{condition.name}</span>
      <div
        className={`${styles.condition} ${condition.psychologicalCondition ? '' : styles.notCondition}`}
      ></div>
    </Link>
  );
};

export default SearchItem;
