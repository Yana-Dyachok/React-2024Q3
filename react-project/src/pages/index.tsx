/* eslint-disable react-refresh/only-export-components */
export { getServerSideProps } from '../components/main-content/get-server-side-props-main';
import { setSearchResults } from '../redux/slices/search-result-slice';
import { setGlobalLoading } from '../redux/slices/loading-slice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchGetQuery } from '../redux/api-slices/api-get-search-slice';
import { useFetchPostQuery } from '../redux/api-slices/api-post-slice';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../components/search-input/search-input';
import SearchList from '../components/search-list/search-list';
import Pagination from '../components/ui/pagination/pagination';
import Loading from '../components/ui/loading/loading';
import useSearchQuery from '../utils/hooks/ls-hook';
import styles from '../components/main-content/main-content.module.css';
import type { RootState } from '../redux/store/store';
import ErrorBoundary from '../components/error-boundary/error-boundary';
import Header from '../components/header/header';
import { Conditions } from '../types/api-interface';

type MainPageProps = {
  initialData: {
    items: Conditions[];
    totalPages: number;
    currentPage: number;
  };
};

function MainPage({ initialData }: MainPageProps) {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [page, setPage] = useState(initialData.currentPage || 1);
  const [pageSize] = useState(15);
  const router = useRouter();
  const { pathname, query } = router;
  const dispatch = useDispatch();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const closeDescription = () => {
    if (pathname !== '/') {
      const queryParams = new URLSearchParams(
        query as Record<string, string>,
      ).toString();
      router.push(`/?${queryParams}`);
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
    const initialPage = query.page ? parseInt(query.page as string, 10) : 1;
    if (!isNaN(initialPage)) {
      setPage(initialPage);
    } else {
      setPage(1);
      router.replace(`/?page=1`);
    }
  }, [query.page, router, pageSize]);

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

  useEffect(() => {
    if (initialData.items.length > 0) {
      dispatch(
        setSearchResults({
          items: initialData.items,
          totalPages: initialData.totalPages,
          currentPage: initialData.currentPage,
        }),
      );
    }
  }, [dispatch, initialData]);

  const handleChange = (value: number) => {
    setPage(value);
    if (searchQuery) {
      router.push(`${pathname}?page=${value}&searchQuery=${searchQuery}`);
    } else {
      router.push(`${pathname}?page=${value}`);
    }
  };

  const handleSearchChange = (search: string) => {
    const searchValue = search.trim();
    setSearchQuery(searchValue);
    setPage(1);
    if (searchValue !== '') {
      router.push(`${pathname}?page=1&searchQuery=${searchValue}`);
    } else {
      router.push(`${pathname}?page=1`);
    }
  };

  const totalPages = data?.page?.totalPages || initialData.totalPages || 1;

  return (
    <>
      <ErrorBoundary>
        <Header />
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
                    <SearchList
                      conditions={data?.medicalConditions || initialData.items}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default MainPage;
