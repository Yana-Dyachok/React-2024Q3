const fetchData = async (page: number, pageSize: number) => {
  try {
    const apiUrl = 'https://stapi.co/api/v1/rest/medicalCondition/search';
    const params = new URLSearchParams({
      pageNumber: (page - 1).toString(),
      pageSize: pageSize.toString(),
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`);
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
};

export default fetchData;
