import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import { ApiResponse, Conditions } from '../../api/api-interface';
import Loading from '../ui/loading/loading';
import styles from './search-result.module.css';
import fetchData from '../../api/api-get-search';

interface MedicalConditionsProps {
  medicalConditions: Conditions[];
}

class SearchResult extends Component<
  MedicalConditionsProps,
  { data: ApiResponse | null; loading: boolean; page: number; pageSize: number }
> {
  constructor(props: MedicalConditionsProps) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      page: 1,
      pageSize: 10,
    };
  }

  fetchData = async (page: number, pageSize: number) => {
    this.setState({ loading: true });
    try {
      const jsonData = await fetchData(page, pageSize);
      this.setState({ data: jsonData, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.fetchData(this.state.page, this.state.pageSize);
  }

  handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    this.setState({ page: value, loading: true }, () => {
      this.fetchData(this.state.page, this.state.pageSize);
    });
  };

  render() {
    const { loading, data, page } = this.state;
    const { medicalConditions } = this.props;
    if (loading) {
      return <Loading />;
    }
    const totalPages = data?.page.totalPages || 1;
    if (
      !medicalConditions ||
      medicalConditions.length === 0 ||
      medicalConditions.length === 50
    ) {
      return (
        <>
          <section className={styles.searchResultBlock}>
            {data?.medicalConditions.map((condition: Conditions) => (
              <div key={condition.uid} className={styles.conditionBlock}>
                <span className={styles.name}>{condition.name}</span>
                <span className={styles.conditionTitle}>{`it's ${
                  condition.psychologicalCondition ? '' : 'not'
                } psychological condition`}</span>
              </div>
            ))}
          </section>
          <Pagination
            className={styles.pagination}
            count={totalPages}
            page={page}
            onChange={this.handleChange}
            sx={{ button: { color: 'inherit' } }}
          />
        </>
      );
    }
    return (
      <section className={styles.searchResultBlock}>
        {medicalConditions.map((condition: Conditions) => (
          <div key={condition.uid} className={styles.conditionBlock}>
            <span className={styles.name}>{condition.name}</span>
            <span className={styles.conditionTitle}>{`it's ${
              condition.psychologicalCondition ? '' : 'not'
            } psychological condition`}</span>
          </div>
        ))}
      </section>
    );
  }
}

export default SearchResult;
