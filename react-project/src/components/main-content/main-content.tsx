import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setSearchResults } from '@/lib/slices/search-result-slice';
import { setGlobalLoading } from '@/lib/slices/loading-slice';
import {
  useFetchPostQuery,
  useFetchMedicalConditions,
} from '@/utils/hooks/api-hooks';
import SearchInput from '../search-input/search-input';
import SearchList from '../search-list/search-list';
import Pagination from '../ui/pagination/pagination';
import Loading from '../ui/loading/loading';
import useSearchQuery from '@/utils/hooks/ls-hook';
import styles from './main-content.module.css';
import type { MainPageProps } from '@/types/types';

const MainContent: React.FC<MainPageProps> = ({ initialData }) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [page, setPage] = useState(initialData?.currentPage || 1);
  const [pageSize] = useState(15);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );
  const fetchPostQuery = useFetchPostQuery(searchQuery, pageSize, page);
  const fetchGetQuery = useFetchMedicalConditions(page, pageSize);
  const { data, error, isLoading } = searchQuery
    ? fetchPostQuery
    : fetchGetQuery;

  const closeDescription = () => {
    if (location.pathname.includes('/item/')) {
      const searchParams = new URLSearchParams(location.search);
      const newUrl = `/?${searchParams.toString()}`;
      navigate(newUrl);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const initialPage = urlParams.get('page')
      ? parseInt(urlParams.get('page') as string, 10)
      : 1;
    if (!isNaN(initialPage)) {
      setPage(initialPage);
    } else {
      setPage(1);
      const newParams = new URLSearchParams(location.search);
      newParams.set('page', '1');
      navigate(`${location.pathname}?${newParams.toString()}`);
    }
  }, [location.search, location.pathname, navigate]);

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
    if (data && !isLoading && !error) {
      dispatch(
        setSearchResults({
          items: data.medicalConditions || [],
          totalPages: data.page?.totalPages ?? 1,
          currentPage: page,
        }),
      );
    }
  }, [data, isLoading, error, dispatch, page]);

  useEffect(() => {
    if (initialData?.items?.length > 0) {
      dispatch(
        setSearchResults({
          items: initialData.items,
          totalPages: initialData.totalPages,
          currentPage: initialData.currentPage,
        }),
      );
    }
  }, [dispatch, initialData]);

  const handleChange = useCallback(
    (value: number) => {
      setPage(value);
      const newParams = new URLSearchParams(location.search);
      newParams.set('page', value.toString());
      newParams.set('searchQuery', searchQuery || '');
      navigate(`${location.pathname}?${newParams.toString()}`);
    },
    [searchQuery, location.search, location.pathname, navigate],
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      const searchValue = search.trim();
      setSearchQuery(searchValue);
      setPage(1);
      const newParams = new URLSearchParams(location.search);
      newParams.set('page', '1');
      newParams.set('searchQuery', searchValue || '');
      navigate(`${location.pathname}?${newParams.toString()}`);
    },
    [setSearchQuery, location.search, location.pathname, navigate],
  );

  const totalPages = data?.page?.totalPages ?? initialData?.totalPages ?? 1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent} onClick={closeDescription}>
        <SearchInput onSearchChange={handleSearchChange} />
        {isLoadingGlobal ? (
          <Loading />
        ) : error ? (
          <div>No data found</div>
        ) : (
          <div className={styles.searchResult}>
            {data?.medicalConditions?.length === 0 ? (
              <div>No results found</div>
            ) : (
              <>
                <Pagination
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={handleChange}
                />
                <SearchList
                  conditions={
                    data?.medicalConditions ||
                    (initialData && initialData.items) ||
                    []
                  }
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
