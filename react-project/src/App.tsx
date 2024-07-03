import ErrorBoundary from './components/error-boundary/error-boundary';

function App() {
  const throwError = () => {
    throw new Error('Manual error thrown');
  };

  return (
    <ErrorBoundary fallback={<p>Get Error</p>}>
      <>
        <p>Hi</p>
        <button onClick={throwError}>Throw Error</button>
      </>
    </ErrorBoundary>
  );
}

export default App;
