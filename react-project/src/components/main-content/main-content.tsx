import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useFetchGetQuery } from '../../redux/api-slices/api-get-search-slice';
import { useFetchPostQuery } from '../../redux/api-slices/api-post-slice';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults } from '../../redux/slices/search-result-slice';
import { setGlobalLoading } from '../../redux/slices/loading-slice';
import SearchInput from '../search-input/search-input';
import SearchList from '../search-list/search-list';
import Pagination from '../ui/pagination/pagination';
import Loading from '../ui/loading/loading';
import useSearchQuery from '../../utils/hooks/ls-hook';
import styles from './main-content.module.css';
import type { RootState } from '../../redux/store/store';

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const closeDescription = () => {
    if (pathname !== '/') {
      navigate(`/${search}`);
    }
  };

  let data, error, isLoading;
  const fetchPostQuery = useFetchPostQuery({ searchQuery, pageSize, page });
  const fetchGetQuery = useFetchGetQuery({ page, pageSize });

  if (searchQuery) {
    ({ data, error, isLoading } = fetchPostQuery);
  } else {
    ({ data, error, isLoading } = fetchGetQuery);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const initialPage = urlParams.get('page');
    if (initialPage && !isNaN(Number(initialPage))) {
      setPage(Number(initialPage));
    } else {
      setPage(1);
      navigate(`/?page=1`, { replace: true });
    }
  }, [search, navigate, pageSize]);

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
    if (data && !isLoading && !error) {
      dispatch(
        setSearchResults({
          items: data.medicalConditions,
          totalPages: data.page.totalPages,
          currentPage: page,
        }),
      );
    }
  }, [data, isLoading, error, dispatch, page]);

  const handleChange = (value: number) => {
    setPage(value);
    navigate(`${pathname}?page=${value}`);
  };

  const handleSearchChange = (search: string) => {
    const searchValue = search.trim();
    setSearchQuery(searchValue);
    setPage(1);
    navigate(`${pathname}?page=1`);
  };

  const totalPages = data?.page.totalPages || 1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.mainContent} onClick={closeDescription}>
          <SearchInput onSearchChange={handleSearchChange} />
          {isLoadingGlobal ? (
            <Loading />
          ) : error ? (
            <div>No data found</div>
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
