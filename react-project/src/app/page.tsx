import Header from '@/components/header/header';
import MainContent from '@/components/main-content/main-content';
import fetchData from '@/app/api/api-get.ts';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
export default async function MainPage() {
  const page = 1;
  const pageSize = 15;

  const fetchDataAsync = async () => {
    const response = await fetchData(page, pageSize);
    return response;
  };

  const data = await fetchDataAsync();

  const initialData = {
    items: data?.medicalConditions || [],
    totalPages: data?.page.totalPages || 1,
    currentPage: data?.page.pageNumber || 15,
  };

  return (
    <>
      <ErrorBoundary>
        <Header />
        <MainContent initialData={initialData} />;
      </ErrorBoundary>
    </>
  );
}
