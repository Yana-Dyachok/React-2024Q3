import React from 'react';
import SearchItem from '../search-item/search-item';
import { Conditions } from '../../types/api-interface';
import styles from './search-list.module.css';
import Flyout from '../flyout/flyout';
interface SearchListProps {
  conditions: Conditions[];
}

const SearchList: React.FC<SearchListProps> = ({ conditions }) => (
  <>
    <section className={styles.searchResultBlock}>
      {conditions.length === 0 ? (
        <p>No data found</p>
      ) : (
        conditions.map((condition: Conditions) => (
          <SearchItem key={condition.uid} condition={condition} />
        ))
      )}
    </section>
    <Flyout />
  </>
);

export default SearchList;
