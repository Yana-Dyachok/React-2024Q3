/* eslint-disable react-refresh/only-export-components */
export { getServerSideProps } from '../../components/main-content/get-server-side-props-main';
import React from 'react';
import MainContent from '../../components/main-content/main-content';
import DescriptionItem from '../../components/description-item/description-item';
import { MainPageProps } from '../../types/types';
import Header from '../../components/header/header';
import ErrorBoundary from '../../components/error-boundary/error-boundary';
import styles from '../../components/main-content/main-content.module.css';
const DescriptionPage: React.FC<MainPageProps> = (props) => {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <div className={styles.container}>
          <MainContent {...props} />
          <DescriptionItem />
        </div>
      </ErrorBoundary>
    </>
  );
};

export default DescriptionPage;
