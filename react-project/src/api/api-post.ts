const fetchDataConditions = async (searchQuery: string) => {
  try {
    const apiUrl = 'https://stapi.co/api/v1/rest/medicalCondition/search';
    const params = new URLSearchParams({
      sort: 'name,ASC',
    });

    const bodyData = {
      name: searchQuery,
      psychologicalCondition: 'true',
    };

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(bodyData),
    });

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

export default fetchDataConditions;
