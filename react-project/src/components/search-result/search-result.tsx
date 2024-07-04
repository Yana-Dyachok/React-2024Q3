import { Component } from 'react';
import { ApiResponse, Conditions } from '../../api/api-interface';
import Loading from '../ui/loading/loading';
import styles from './search-result.module.css';
class SearchResult extends Component<
  Record<string, never>,
  { data: ApiResponse | null; loading: boolean }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const pageNumber = 0;
    const pageSize = 20;

    try {
      const apiUrl = 'https://stapi.co/api/v1/rest/medicalCondition/search';
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      });

      const response = await fetch(`${apiUrl}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch medical conditions: ${response.status} ${response.statusText}`,
        );
      }

      const jsonData = await response.json();
      console.log(jsonData);
      this.setState({ data: jsonData, loading: false });
    } catch (error) {
      console.error('Error fetching medical conditions:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    const { data } = this.state;
    return (
      <section className={styles.searchResultBlock}>
        {data?.medicalConditions.map((condition: Conditions) => (
          <div key={condition.uid} className={styles.conditionBlock}>
            <span className={styles.conditionTitle}>condition:</span>
            <span className={styles.name}>{condition.name}</span>
          </div>
        ))}
      </section>
    );
  }
}

export default SearchResult;
