import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store/store';
import { addSearchInput } from '../../app/slices/search-slice';
import useSearchQuery from '../../utils/hooks/ls-hook';
import styles from './search-input.module.css';

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
    dispatch(addSearchInput(query));
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
    <section
      className={styles.searchInputBlock}
      onClick={(event) => event.stopPropagation()}
    >
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
