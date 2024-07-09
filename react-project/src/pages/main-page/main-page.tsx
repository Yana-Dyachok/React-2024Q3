import MainContent from '../../components/main-content/main-content';
import ErrorBoundary from '../../components/error-boundary/error-boundary';
import ErrorButton from '../../components/error-boundary/error-btn';
function MainPage() {
  return (
    <>
      {' '}
      <ErrorBoundary>
        <ErrorButton />
        <MainContent />
      </ErrorBoundary>
    </>
  );
}

export default MainPage;
