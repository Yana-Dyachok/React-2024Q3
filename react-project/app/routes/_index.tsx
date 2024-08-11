import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../src/components/header/header';
import ErrorBoundary from '../../src/components/error-boundary/error-boundary';
import MainContent from '../../src/components/main-content/main-content';
import fetchData from '../../src/api/api-get';
import { ApiResponse } from '../../src/types/api-interface';

const MainPage: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  const page = 1;
  const pageSize = 15;

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchData(page, pageSize);
        setData(response);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchDataAsync();
  }, [page, pageSize]);

  const initialData = {
    items: data?.medicalConditions || [],
    totalPages: data?.page.totalPages || 1,
    currentPage: data?.page.pageNumber || 1,
  };

  return (
    <>
      <ErrorBoundary>
        <Header />
        <MainContent initialData={initialData} />
        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
