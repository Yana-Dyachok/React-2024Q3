import React, { useState, useEffect } from 'react';
import { Conditions } from '../../api/api-interface';
import SearchInput from '../search-input/search-input';
import SearchResult from '../search-result/search-result';
import Loading from '../ui/loading/loading';
import useSearchQuery from '../../utils/hooks/ls-hook';
import fetchDataConditions from '../../api/api-post';
import styles from './main-content.module.css';

const MainContent: React.FC = () => {
  const [data, setData] = useState<Conditions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const apiResult: Conditions[] | null =
        await fetchDataConditions(searchQuery);
      if (apiResult) {
        setData(apiResult);
      } else {
        setData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchChange = async (search: string) => {
    setLoading(true);
    const searchValue = search.trim();
    setSearchQuery(searchValue);
    const result: Conditions[] | null = await fetchDataConditions(searchValue);
    if (result) {
      setData(result);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <SearchInput onSearchChange={handleSearchChange} />
        {loading ? <Loading /> : <SearchResult medicalConditions={data} />}
      </div>
    </div>
  );
};

export default MainContent;
