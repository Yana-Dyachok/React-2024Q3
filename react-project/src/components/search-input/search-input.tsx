import React, { useState, useEffect } from 'react';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/local-storage/ls-handler';
import styles from './search-input.module.css';

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedQuery = getFromLocalStorage('searchQuery');
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
    saveToLocalStorage('searchQuery', query);
  };

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();
    onSearchChange(trimmedQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <section className={styles.searchInputBlock}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search"
        pattern="[a-zA-Z]*"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />
      <button
        type="button"
        className={styles.searchBtn}
        onClick={handleSearchClick}
      />
    </section>
  );
};

export default SearchInput;
