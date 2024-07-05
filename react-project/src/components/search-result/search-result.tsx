import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import { ApiResponse, Conditions } from '../../api/api-interface';
import Loading from '../ui/loading/loading';
import styles from './search-result.module.css';
import fetchData from '../../api/api-get-search';

interface MedicalConditionsProps {
  medicalConditions: Conditions[];
}

interface SearchResultState {
  data: ApiResponse | null;
  loading: boolean;
  page: number;
  pageSize: number;
}

class SearchResult extends Component<
  MedicalConditionsProps,
  SearchResultState
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

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { page, pageSize } = this.state;
    this.setState({ loading: true });
    try {
      const jsonData = await fetchData(page, pageSize);
      this.setState({ data: jsonData, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    this.setState({ page: value }, this.fetchData);
  };

  renderConditions = (conditions: Conditions[]) => (
    <section className={styles.searchResultBlock}>
      {conditions.map((condition: Conditions) => (
        <div key={condition.uid} className={styles.conditionBlock}>
          <span className={styles.name}>{condition.name}</span>
          <span className={styles.conditionTitle}>
            {`it's ${
              condition.psychologicalCondition ? '' : 'not'
            } psychological condition`}
          </span>
        </div>
      ))}
    </section>
  );

  render() {
    const { loading, data, page } = this.state;
    const { medicalConditions } = this.props;

    if (loading) {
      return <Loading />;
    }

    const conditionsToRender: Conditions[] =
      !medicalConditions ||
      medicalConditions.length === 0 ||
      medicalConditions.length === 50
        ? data?.medicalConditions || []
        : medicalConditions;

    const totalPages = data?.page.totalPages || 1;

    return (
      <>
        {this.renderConditions(conditionsToRender)}
        {conditionsToRender.length > 7 && (
          <Pagination
            className={styles.pagination}
            count={totalPages}
            page={page}
            onChange={this.handleChange}
            sx={{ button: { color: 'inherit' } }}
          />
        )}
      </>
    );
  }
}

export default SearchResult;
