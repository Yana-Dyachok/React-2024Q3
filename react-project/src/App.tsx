import ErrorBoundary from './components/error-boundary/error-boundary';
import MainContent from './components/main-content/main-content';
import Button from './components/ui/button/button';
function App() {
  const throwError = () => {
    throw new Error('Manual error thrown');
  };

  return (
    <ErrorBoundary fallback={<p>Get Error</p>}>
      <Button btnType="button" onClick={throwError}>
        Error
      </Button>
      <MainContent />
    </ErrorBoundary>
  );
}

export default App;
