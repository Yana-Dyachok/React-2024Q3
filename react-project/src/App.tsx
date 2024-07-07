import React from 'react';
import ErrorBoundary from './components/error-boundary/error-boundary';
import MainContent from './components/main-content/main-content';
import Button from './components/ui/button/button';
import PopUp from './components/ui/popup/popup';

class App extends React.Component {
  throwError = () => {
    throw new Error('Manual error thrown');
  };

  render() {
    return (
      <ErrorBoundary
        fallback={<PopUp text="You are getting an error" duration={3000} />}
      >
        <Button btnType="button" onClick={this.throwError}>
          Error
        </Button>
        <MainContent />
      </ErrorBoundary>
    );
  }
}

export default App;
