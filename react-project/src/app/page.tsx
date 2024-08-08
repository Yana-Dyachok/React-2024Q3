'use client';
import React from 'react';
import Header from '@/components/header/header';
import ErrorBoundary from '@/components/error-boundary/error-boundary';

const MainPage: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
