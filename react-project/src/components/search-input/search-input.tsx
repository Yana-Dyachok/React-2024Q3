import React from 'react';
import useSearchQuery from '../../utils/hooks/ls-hook';
import styles from './search-input.module.css';

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
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
