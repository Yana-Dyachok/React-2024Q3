import React from 'react';
import styles from './search-item.module.css';

interface SearchItemProps {
  condition: {
    uid: string;
    name: string;
    psychologicalCondition: boolean;
  };
}

const SearchItem: React.FC<SearchItemProps> = ({ condition }) => (
  <div className={styles.conditionBlock}>
    <span className={styles.name}>{condition.name}</span>
    <span className={styles.conditionTitle}>
      {`it's ${condition.psychologicalCondition ? '' : 'not'} psychological condition`}
    </span>
  </div>
);

export default SearchItem;
