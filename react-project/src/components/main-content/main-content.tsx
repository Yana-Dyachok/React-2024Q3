import React from 'react';
import { Conditions } from '../../api/api-interface';
import SearchInput from '../search-input/search-input';
import SearchResult from '../search-result/search-result';
import Loading from '../ui/loading/loading';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/local-storage/ls-handler';
import fetchDataConditions from '../../api/api-post';

import styles from './main-content.module.css';

interface MainContentState {
  data: Conditions[];
  loading: boolean;
}

class MainContent extends React.Component<
  Record<string, never>,
  MainContentState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const LSResult: string = getFromLocalStorage('searchQuery');

    const ApiResult: Conditions[] | null = await fetchDataConditions(LSResult);
    if (ApiResult) {
      this.setState({ data: ApiResult, loading: false });
    } else {
      this.setState({ data: [], loading: false });
    }
  }

  handleSearchChange = async (search: string) => {
    this.setState({ loading: true });

    const searchValue = search.trim();
    saveToLocalStorage('searchQuery', searchValue);

    const result: Conditions[] | null = await fetchDataConditions(searchValue);
    if (result) {
      this.setState({ data: result, loading: false });
    } else {
      this.setState({ data: [], loading: false });
    }
  };

  render() {
    const { data, loading } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          <SearchInput onSearchChange={this.handleSearchChange} />
          {loading ? <Loading /> : <SearchResult medicalConditions={data} />}
        </div>
      </div>
    );
  }
}

export default MainContent;
