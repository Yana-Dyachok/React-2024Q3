import React from 'react';
import { Link } from 'react-router-dom';
import styles from './search-item.module.css';

interface SearchItemProps {
  condition: {
    uid: string;
    name: string;
    psychologicalCondition: boolean;
  };
}

const SearchItem: React.FC<SearchItemProps> = ({ condition }) => (
  <Link
    className={styles.conditionBlock}
    key={condition.uid}
    to={`item/${condition.uid}`}
    onClick={(event) => event.stopPropagation()}
  >
    <span className={styles.name}>{condition.name}</span>
    <div
      className={`${styles.condition} ${condition.psychologicalCondition ? '' : styles.notCondition}`}
    ></div>
  </Link>
);

export default SearchItem;
