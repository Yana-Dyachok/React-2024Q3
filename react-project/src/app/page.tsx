import MainContent from '@/components/main-content/main-content';
import fetchData from '@/app/api/api-get.ts';

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

  return <MainContent initialData={initialData} />;
}
