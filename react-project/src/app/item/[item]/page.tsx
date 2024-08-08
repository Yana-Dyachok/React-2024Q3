'use client';
import React from 'react';
import Header from '@/components/header/header';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
import MainContent from '@/components/main-content/main-content';
import { MainPageProps } from '@/types/types';
import DescriptionItem from '@/components/description-item/description-item';
import styles from '../../../components/main-content/main-content.module.css';

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
