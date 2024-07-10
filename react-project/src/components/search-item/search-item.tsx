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
  >
    <span className={styles.name}>{condition.name}</span>
    <span className={styles.conditionTitle}>
      {`It's ${condition.psychologicalCondition ? '' : 'not'} a psychological condition`}
    </span>
  </Link>
);

export default SearchItem;
