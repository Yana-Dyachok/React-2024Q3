import React, { useState, useEffect } from 'react';
import { ApiResponse } from '../../api/api-interface';
import SearchInput from '../search-input/search-input';
import SearchList from '../search-list/search-list';
import Pagination from '../ui/pagination/pagination';
import Loading from '../ui/loading/loading';
import useSearchQuery from '../../utils/hooks/ls-hook';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import fetchDataConditions from '../../api/api-post';
import fetchData from '../../api/api-get-search';
import styles from './main-content.module.css';

const MainContent: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const closeDescription = () => {
    if (pathname !== '/') {
      navigate(`/${search}`);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const initialPage = urlParams.get('page');
    if (initialPage && !isNaN(Number(initialPage))) {
      setPage(Number(initialPage));
    } else {
      setPage(1);
      navigate(`/?pageSize=${pageSize}&page=1`, { replace: true });
    }
  }, [search, navigate, pageSize]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        const apiResult =
          searchQuery === ''
            ? await fetchData(page, pageSize)
            : await fetchDataConditions(searchQuery, pageSize, page);
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

    fetchDataAsync();
  }, [page, pageSize, searchQuery]);

  const handleChange = (value: number) => {
    setPage(value);
    navigate(`${pathname}?pageSize=${pageSize}&page=${value}`);
  };

  const handleSearchChange = async (search: string) => {
    setLoading(true);
    const searchValue = search.trim();
    setSearchQuery(searchValue);
    setPage(1);
    navigate(`${pathname}?pageSize=${pageSize}&page=${1}`);
    try {
      const response: ApiResponse | null = await fetchDataConditions(
        searchValue,
        pageSize,
        page,
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

  const totalPages = data?.page.totalPages || 1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.mainContent} onClick={closeDescription}>
          <SearchInput onSearchChange={handleSearchChange} />
          {loading ? (
            <Loading />
          ) : (
            <div className={styles.searchResult}>
              {data?.medicalConditions.length === 0 ? (
                <></>
              ) : (
                <Pagination
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={handleChange}
                />
              )}
              <div className={styles.searchResult}>
                <SearchList conditions={data?.medicalConditions || []} />
              </div>
            </div>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainContent;
