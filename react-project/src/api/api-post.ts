import { ApiResponse, Conditions } from './api-interface';

const PATH = `https://stapi.co/api/v1/rest/medicalCondition/search`;

const fetchDataConditions = async (
  search: string,
  pageNumber = 0,
  pageSize = 15,
): Promise<Conditions[] | null> => {
  const url = `${PATH}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  try {
    const result: Response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name: search }),
    });

    if (!result.ok) return null;

    const response: ApiResponse = await result.json();
    return response.medicalConditions;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

export default fetchDataConditions;
