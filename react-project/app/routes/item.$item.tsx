import React from 'react';
import Header from '../../src/components/header/header';
import ErrorBoundary from '../../src/components/error-boundary/error-boundary';
import MainContent from '../../src/components/main-content/main-content';
import { MainPageProps } from '../../src/types/types';
import DescriptionItem from '../../src/components/description-item/description-item';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '3rem',
  padding: '0.5rem',
};

const DescriptionPage: React.FC<MainPageProps> = (props) => {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <div style={containerStyle}>
          <MainContent {...props} />
          <DescriptionItem />
        </div>
      </ErrorBoundary>
    </>
  );
};

export default DescriptionPage;
