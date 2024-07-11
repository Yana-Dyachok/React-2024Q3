import React, { useState, useEffect } from 'react';
import { ApiResponse } from '../../api/api-interface';
import SearchInput from '../search-input/search-input';
import SearchResult from '../search-result/search-result';
import Loading from '../ui/loading/loading';
import useSearchQuery from '../../utils/hooks/ls-hook';
import fetchDataConditions from '../../api/api-post';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styles from './main-content.module.css';

const MainContent: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const closeDescription = () => {
    if (pathname !== '/') {
      navigate(`/${search}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiResult: ApiResponse | null = await fetchDataConditions(
          searchQuery,
          15,
          0,
        );
        if (apiResult !== null) {
          setData(apiResult);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchChange = async (search: string) => {
    setLoading(true);
    const searchValue = search.trim();
    setSearchQuery(searchValue);

    try {
      const response: ApiResponse | null = await fetchDataConditions(
        searchValue,
        15,
        0,
      );
      if (response !== null) {
        setData(response);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.mainContent} onClick={closeDescription}>
          <SearchInput onSearchChange={handleSearchChange} />
          {loading ? (
            <Loading />
          ) : (
            <SearchResult searchData={data!} searchQuery={searchQuery} />
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainContent;
