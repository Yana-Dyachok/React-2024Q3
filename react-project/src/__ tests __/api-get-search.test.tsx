import fetchData from '../api/api-get-search';

describe('fetchData', () => {
  const originalFetch = window.fetch;
  const mockFetch = jest.fn();

  beforeAll(() => {
    window.fetch = mockFetch;
  });

  afterAll(() => {
    window.fetch = originalFetch;
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it('fetches data successfully', async () => {
    const mockResponse = {
      page: { totalPages: 1 },
      medicalConditions: [{ id: 1, name: 'Condition 1' }],
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const page = 1;
    const pageSize = 15;
    const data = await fetchData(page, pageSize);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://stapi.co/api/v1/rest/medicalCondition/search?pageNumber=${
        page - 1
      }&pageSize=${pageSize}`,
    );
    expect(data).toEqual(mockResponse);
  });

  it('handles non-OK response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    const page = 1;
    const pageSize = 15;

    await expect(fetchData(page, pageSize)).rejects.toThrow(
      'Failed to fetch medical conditions: 500 Internal Server Error',
    );
  });

  it('handles fetch errors', async () => {
    const errorMessage = 'Network Error';
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    const page = 1;
    const pageSize = 15;

    await expect(fetchData(page, pageSize)).rejects.toThrow(errorMessage);
  });
});
