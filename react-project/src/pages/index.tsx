import ErrorBoundary from '../components/error-boundary/error-boundary';
import Header from '../components/header/header';
import MainContent from '../components/main-content/main-content';
/* eslint-disable react-refresh/only-export-components */
export { getServerSideProps } from '../components/main-content/get-server-side-props-main';
function MainPage() {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <MainContent />
      </ErrorBoundary>
    </>
  );
}

export default MainPage;
