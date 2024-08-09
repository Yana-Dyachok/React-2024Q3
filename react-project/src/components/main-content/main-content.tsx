import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';
import { setSearchResults } from '@/app/lib/slices/search-result-slice';
import { setGlobalLoading } from '@/app/lib/slices/loading-slice';
import { useFetchGetQuery } from '@/app/lib/api-slices/api-get-search-slice';
import { useFetchPostQuery } from '@/app/lib/api-slices/api-post-slice';
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
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isLoadingGlobal = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const fetchPostQuery = useFetchPostQuery({ searchQuery, pageSize, page });
  const fetchGetQuery = useFetchGetQuery({ page, pageSize });
  const { data, error, isLoading } = searchQuery
    ? fetchPostQuery
    : fetchGetQuery;

  const closeDescription = () => {
    if (pathname.includes('/item/')) {
      const searchParams = new URLSearchParams(window.location.search);
      const newUrl = `/?${searchParams.toString()}`;
      router.push(newUrl);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page')
      ? parseInt(urlParams.get('page') as string, 10)
      : 1;
    if (!isNaN(initialPage)) {
      setPage(initialPage);
    } else {
      setPage(1);
      const newParams = new URLSearchParams(window.location.search);
      newParams.set('page', '1');
      router.push(`${window.location.pathname}?${newParams.toString()}`);
    }
  }, [router]);

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
      const newParams = new URLSearchParams(window.location.search);
      newParams.set('page', value.toString());
      newParams.set('searchQuery', searchQuery || '');
      router.push(`${window.location.pathname}?${newParams.toString()}`);
    },
    [searchQuery, router],
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      const searchValue = search.trim();
      setSearchQuery(searchValue);
      setPage(1);
      const newParams = new URLSearchParams(window.location.search);
      newParams.set('page', '1');
      newParams.set('searchQuery', searchValue || '');
      router.push(`${window.location.pathname}?${newParams.toString()}`);
    },
    [setSearchQuery, router],
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
