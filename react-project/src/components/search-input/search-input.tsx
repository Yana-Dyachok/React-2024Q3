import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/lib/store';
import { addSearchInput } from '@/app/lib/slices/search-slice';
import useSearchQuery from '../../utils/hooks/ls-hook';
import { useTheme } from '../../theme-context/theme-context';
import styles from './search-input.module.css';

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const themeClass = theme === 'light' ? styles.lightTheme : styles.darkTheme;
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
      className={`${styles.searchInputBlock} ${themeClass}`}
      onClick={(event) => event.stopPropagation()}
    >
      <input
        className={`${styles.searchInput} ${themeClass}`}
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
        className={`${styles.searchBtn} ${themeClass}`}
        onClick={handleSearchClick}
      />
    </section>
  );
};

export default SearchInput;
