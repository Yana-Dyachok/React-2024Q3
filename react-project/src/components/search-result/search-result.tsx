import React, { useState, useEffect } from 'react';
import { ApiResponse, Conditions } from '../../api/api-interface';
import Loading from '../ui/loading/loading';
import fetchData from '../../api/api-get-search';
import fetchDataConditions from '../../api/api-post';
import Pagination from '../ui/pagination/pagination';
import SearchList from '../search-list/search-list';
import { useNavigate, useLocation } from 'react-router-dom';

interface SearchResultProps {
  searchData: ApiResponse;
  searchQuery: string;
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchData,
  searchQuery,
}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

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
    navigate(`${pathname}?pageSize=${pageSize}&page=${value}`);
  };

  if (loading) {
    return <Loading />;
  }

  const conditionsToRender: Conditions[] =
    searchQuery === ''
      ? data?.medicalConditions || []
      : searchData.medicalConditions;
  const totalPages =
    searchQuery === ''
      ? data?.page.totalPages || 1
      : searchData.page.totalPages;

  return (
    <>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handleChange}
      />
      <SearchList conditions={conditionsToRender} />
    </>
  );
};

export default SearchResult;
