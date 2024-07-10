import React from 'react';
import SearchItem from '../search-item/search-item';
import { Conditions } from '../../api/api-interface';
import styles from './search-list.module.css';

interface SearchListProps {
  conditions: Conditions[];
}

const SearchList: React.FC<SearchListProps> = ({ conditions }) => (
  <section className={styles.searchResultBlock}>
    {conditions.length === 0 ? (
      <p>No data found</p>
    ) : (
      conditions.map((condition: Conditions) => (
        <SearchItem key={condition.uid} condition={condition} />
      ))
    )}
  </section>
);

export default SearchList;
