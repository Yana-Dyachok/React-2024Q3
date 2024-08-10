'use client';
import Header from '@/components/header/header';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
import MainContent from '@/components/main-content/main-content';
import { useFetchMedicalConditions } from '@/utils/hooks/api-hooks';
import Loading from '@/components/ui/loading/loading';

export default function MainPage() {
  const page = 1;
  const pageSize = 15;

  const { data, error, isLoading } = useFetchMedicalConditions(page, pageSize);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const initialData = {
    items: data?.medicalConditions || [],
    totalPages: data?.page.totalPages || 1,
    currentPage: data?.page.pageNumber || 15,
  };

  return (
    <ErrorBoundary>
      <Header />
      <MainContent initialData={initialData} />
    </ErrorBoundary>
  );
}
