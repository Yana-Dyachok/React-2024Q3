import { Component } from 'react';
import { ApiResponse } from '../../api/api-interface';
import SearchInput from '../search-input/search-input';
import SearchResult from '../search-result/search-result';
import Loading from '../ui/loading/loading';
import styles from './main-content.module.css';

class MainContent extends Component<
  Record<string, never>,
  { data: ApiResponse | null; loading: boolean; searchQuery: string }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      searchQuery: '',
    };
  }

  async fetchDataConditions(searchQuery: string) {
    const pageNumber = 0;
    const pageSize = 20;

    try {
      this.setState({ loading: true });
      const apiUrl = 'https://stapi.co/api/v1/rest/medicalCondition/search';
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        sort: 'name,ASC',
      });

      const bodyData = {
        name: searchQuery,
        psychologicalCondition: 'true',
      };

      const response = await fetch(`${apiUrl}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(bodyData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch medical conditions: ${response.status} ${response.statusText}`,
        );
      }

      const jsonData = await response.json();
      this.setState({ data: jsonData, loading: false });
    } catch (error) {
      console.error('Error fetching medical conditions:', error);
      this.setState({ loading: false });
    }
  }

  handleSearchChange = (searchQuery: string) => {
    this.setState({ searchQuery }, () => {
      this.fetchDataConditions(searchQuery);
    });
  };

  render() {
    const { loading, data } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          <SearchInput onSearchChange={this.handleSearchChange} />
          {loading && <Loading />}
          {data && (
            <div>
              <p>Page Number: {data.page.pageNumber}</p>
              <p>Page Size: {data.page.pageSize}</p>
              {/* <pre>{JSON.stringify(data.medicalConditions, null, 2)}</pre> */}
            </div>
          )}
          <SearchResult />
        </div>
      </div>
    );
  }
}

export default MainContent;
