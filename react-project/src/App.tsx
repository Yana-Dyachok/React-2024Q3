import ErrorBoundary from './components/error-boundary/error-boundary';
function App() {
  return (
    <ErrorBoundary fallback={<p>Get Error</p>}>
      <>
        <p>Hi</p>
      </>
    </ErrorBoundary>
  );
}

export default App;
