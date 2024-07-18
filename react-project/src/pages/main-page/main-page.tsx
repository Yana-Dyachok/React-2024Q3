import MainContent from '../../components/main-content/main-content';
import ErrorBoundary from '../../components/error-boundary/error-boundary';
import Header from '../../components/header/header';
function MainPage() {
  return (
    <>
      {' '}
      <ErrorBoundary>
        <Header />
        <MainContent />
      </ErrorBoundary>
    </>
  );
}

export default MainPage;
