import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { addSearchInput } from '../../redux/slices/search-slice';
import useSearchQuery from '../../utils/hooks/ls-hook';
import { RootState } from '../../redux/store/store';
import { lightTheme } from '../../redux/toggle-theme/theme';
import { useSelector } from 'react-redux';
import styles from './search-input.module.css';

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const dispatch = useDispatch<AppDispatch>();
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const themeClass =
    currentTheme === lightTheme ? styles.lightTheme : styles.darkTheme;
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
