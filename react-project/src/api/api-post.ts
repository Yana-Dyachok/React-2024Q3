import { ApiResponse } from './api-interface';

const PATH = `https://stapi.co/api/v1/rest/medicalCondition/search`;

const fetchDataConditions = async (
  search: string,
  pageSize: number,
  pageNumber: number,
): Promise<ApiResponse | null> => {
  const url = `${PATH}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  try {
    const result: Response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name: search }),
    });

    if (!result.ok) return null;

    const response: ApiResponse = await result.json();
    return response;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

export default fetchDataConditions;
