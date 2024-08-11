import React from 'react';
import Header from '../../src/components/header/header';
import ErrorBoundary from '../../src/components/error-boundary/error-boundary';
import MainContent from '../../src/components/main-content/main-content';
import fetchData from '../../src/api/api-get';
import { ApiResponse } from '../../src/types/api-interface';

import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
/* eslint-disable react-refresh/only-export-components */
export const loader: LoaderFunction = async () => {
  try {
    const page = 1;
    const pageSize = 15;
    const data = await fetchData(page, pageSize);
    return json(data);
  } catch (error) {
    console.error('Error loading data:', error);
    return json({ error: 'Failed to load data' }, { status: 500 });
  }
};

export default function MainPage() {
  const data = useLoaderData<ApiResponse>();

  const initialData = {
    items: data?.medicalConditions || [],
    totalPages: data?.page.totalPages || 1,
    currentPage: data?.page.pageNumber || 1,
  };

  return (
    <ErrorBoundary>
      <Header />
      <MainContent initialData={initialData} />
    </ErrorBoundary>
  );
}
