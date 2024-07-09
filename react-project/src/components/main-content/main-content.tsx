import React, { useState, useEffect } from 'react';
import { ApiResponse } from '../../api/api-interface';
import SearchInput from '../search-input/search-input';
import SearchResult from '../search-result/search-result';
import Loading from '../ui/loading/loading';
import { getFromLocalStorage } from '../../utils/local-storage/ls-handler';
import fetchDataConditions from '../../api/api-post';
import styles from './main-content.module.css';

const MainContent: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    getFromLocalStorage('searchQuery') || '',
  );

  useEffect(() => {
    if (searchQuery || searchQuery === '') {
      fetchData(searchQuery);
    }
  }, [searchQuery]);

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const jsonData = await fetchDataConditions(query);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <SearchInput onSearchChange={handleSearchChange} />
        {data && <SearchResult medicalConditions={data.medicalConditions} />}
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default MainContent;
