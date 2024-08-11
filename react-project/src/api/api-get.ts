import { PATH_SEARCH } from '@/utils/const/const';
export default async function fetchData(page: number, pageSize: number) {
  try {
    const params = new URLSearchParams({
      pageNumber: (page - 1).toString(),
      pageSize: pageSize.toString(),
    });

    const response = await fetch(`${PATH_SEARCH}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch medical conditions: ${response.status} ${response.statusText}`,
      );
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching medical conditions:', error);
    throw error;
  }
}
