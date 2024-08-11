'use client';
import React from 'react';
import Header from '../../../src/components/header/header';
import ErrorBoundary from '../../../src/components/error-boundary/error-boundary';
import DescriptionItem from '../../../src/components/description-item/description-item';

const DescriptionPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <DescriptionItem />
      </ErrorBoundary>
    </>
  );
};

export default DescriptionPage;
