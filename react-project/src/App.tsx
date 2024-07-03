import ErrorBoundary from './components/error-boundary/error-boundary';
import MainContent from './components/main-content/main-content';
function App() {
  const throwError = () => {
    throw new Error('Manual error thrown');
  };

  return (
    <ErrorBoundary fallback={<p>Get Error</p>}>
      <>
        <MainContent />
        <button onClick={throwError}>Throw Error</button>
      </>
    </ErrorBoundary>
  );
}

export default App;
