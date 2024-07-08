import React from 'react';
import ErrorBoundary from './components/error-boundary/error-boundary';
import MainContent from './components/main-content/main-content';
import ErrorButton from './components/error-boundary/error-btn';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <ErrorButton />
        <MainContent />
      </ErrorBoundary>
    );
  }
}

export default App;
