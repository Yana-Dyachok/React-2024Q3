import { Component } from 'react';
import { ApiResponse } from '../../api/api-interface';
import SearchInput from '../search-input/search-input';
import SearchResult from '../search-result/search-result';
import Loading from '../ui/loading/loading';
import styles from './main-content.module.css';
import { getFromLocalStorage } from '../../utils/local-storage/ls-handler';
import fetchDataConditions from '../../api/api-post';

interface MainContentState {
  data: ApiResponse | null;
  loading: boolean;
  searchQuery: string;
}

class MainContent extends Component<Record<string, never>, MainContentState> {
  constructor(props: Record<string, never>) {
    super(props);
    const searchQuery = getFromLocalStorage('searchQuery') || '';
    this.state = {
      data: null,
      loading: false,
      searchQuery: searchQuery,
    };
  }

  componentDidMount() {
    const { searchQuery } = this.state;
    if (searchQuery || searchQuery === '') {
      this.handleSearchChange(searchQuery);
    }
  }

  fetchData = async (searchQuery: string) => {
    this.setState({ loading: true });
    try {
      const jsonData = await fetchDataConditions(searchQuery);
      this.setState({ data: jsonData, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  handleSearchChange = (searchQuery: string) => {
    this.setState({ searchQuery }, () => {
      this.fetchData(searchQuery);
    });
  };

  render() {
    const { loading, data } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          <SearchInput onSearchChange={this.handleSearchChange} />
          {data && <SearchResult medicalConditions={data.medicalConditions} />}
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

export default MainContent;
