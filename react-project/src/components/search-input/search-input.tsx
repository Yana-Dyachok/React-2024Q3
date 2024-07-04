import React, { Component } from 'react';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/local-storage/ls-handler';
import styles from './search-input.module.css';

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

interface SearchInputState {
  searchQuery: string;
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    const savedQuery = getFromLocalStorage('searchQuery');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery });
    }
  }

  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.trim();
    this.setState({ searchQuery: query });
    saveToLocalStorage('searchQuery', query);
  }

  handleSearchClick() {
    const trimmedQuery = this.state.searchQuery.trim();
    this.props.onSearchChange(trimmedQuery);
  }

  render() {
    return (
      <section className={styles.searchInputBlock}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          pattern="[a-zA-Z]*"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
          autoComplete="off"
        />
        <button
          type="button"
          className={styles.searchBtn}
          onClick={this.handleSearchClick}
        />
      </section>
    );
  }
}

export default SearchInput;
