import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { setSearchResults } from '../../redux/slices/search-result-slice';
import { setGlobalLoading } from '../../redux/slices/loading-slice';
import { useFetchGetQuery } from '../../redux/api-slices/api-get-search-slice';
import { useFetchPostQuery } from '../../redux/api-slices/api-post-slice';
import SearchInput from '../search-input/search-input';
import SearchList from '../search-list/search-list';
import Pagination from '../ui/pagination/pagination';
import Loading from '../ui/loading/loading';
import useSearchQuery from '../../utils/hooks/ls-hook';
import styles from './main-content.module.css';
import type { MainPageProps } from '../../types/types';

const MainContent: React.FC<MainPageProps> = ({ initialData }) => {
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery');
  const [page, setPage] = useState(initialData.currentPage || 1);
  const [pageSize] = useState(15);
  const router = useRouter();
  const { pathname, query } = router;
  const dispatch = useDispatch();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const fetchPostQuery = useFetchPostQuery({ searchQuery, pageSize, page });
  const fetchGetQuery = useFetchGetQuery({ page, pageSize });

  const { data, error, isLoading } = searchQuery
    ? fetchPostQuery
    : fetchGetQuery;

  useEffect(() => {
    const initialPage = query.page ? parseInt(query.page as string, 10) : 1;
    if (!isNaN(initialPage)) {
      setPage(initialPage);
    } else {
      setPage(1);
      router.replace({ pathname, query: { ...query, page: '1' } });
    }
  }, [query.page, query, router, pathname]);

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

  const handleChange = useCallback(
    (value: number) => {
      setPage(value);
      router.push(
        {
          pathname,
          query: {
            ...query,
            page: value.toString(),
            searchQuery: searchQuery || undefined,
          },
        },
        undefined,
        { shallow: true },
      );
    },
    [pathname, query, searchQuery, router],
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      const searchValue = search.trim();
      setSearchQuery(searchValue);
      setPage(1);
      router.push(
        {
          pathname,
          query: {
            ...query,
            page: '1',
            searchQuery: searchValue !== '' ? searchValue : undefined,
          },
        },
        undefined,
        { shallow: true },
      );
    },
    [pathname, query, router, setSearchQuery],
  );

  const totalPages = data?.page?.totalPages || initialData.totalPages || 1;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.mainContent}
        onClick={() => {
          if (pathname !== '/') {
            const queryParams = new URLSearchParams(
              query as Record<string, string>,
            );
            queryParams.delete('itemId');
            const newQueryString = queryParams.toString();
            router.push(`/?${newQueryString}`, undefined, { shallow: true });
          }
        }}
      >
        <SearchInput onSearchChange={handleSearchChange} />
        {isLoadingGlobal ? (
          <Loading />
        ) : error ? (
          <div>No data found</div>
        ) : (
          <div className={styles.searchResult}>
            {data?.medicalConditions.length === 0 ? (
              <div>No results found</div>
            ) : (
              <>
                <Pagination
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={handleChange}
                />
                <SearchList
                  conditions={data?.medicalConditions || initialData.items}
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
