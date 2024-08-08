/* eslint-disable react-refresh/only-export-components */
export { getServerSideProps } from '../components/main-content/get-server-side-props-main';
import React from 'react';
import MainContent from '../components/main-content/main-content';
import Header from '../components/header/header';
import { MainPageProps } from '../types/types';
import ErrorBoundary from '../components/error-boundary/error-boundary';
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
