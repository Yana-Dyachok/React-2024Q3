'use client';
import React from 'react';
import Header from '@/components/header/header';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
import MainContent from '@/components/main-content/main-content';
import { MainPageProps } from '@/types/types';

const MainPage: React.FC<MainPageProps> = (props) => {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <MainContent {...props} />
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
