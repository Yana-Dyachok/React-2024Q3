import React, { useState, useEffect } from 'react';
import { ApiResponse, Conditions } from '../../api/api-interface';
import Loading from '../ui/loading/loading';
import fetchData from '../../api/api-get-search';
import Pagination from '../ui/pagination/pagination';
import styles from './search-result.module.css';

interface MedicalConditionsProps {
  medicalConditions: Conditions[];
}

const SearchResult: React.FC<MedicalConditionsProps> = ({
  medicalConditions,
}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        const jsonData = await fetchData(page, pageSize);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [page, pageSize]);

  const handleChange = (value: number) => {
    setPage(value);
  };

  const renderConditions = (conditions: Conditions[]) => (
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
      {renderConditions(conditionsToRender)}
      {(!medicalConditions ||
        medicalConditions.length === 0 ||
        medicalConditions.length === 50) && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handleChange}
        />
      )}
    </>
  );
};

export default SearchResult;
