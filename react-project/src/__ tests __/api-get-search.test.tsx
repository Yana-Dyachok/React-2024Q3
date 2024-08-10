import fetchData from '@/app/api/api-get';

describe('fetchData', () => {
  const originalFetch = window.fetch;
  const mockFetch = jest.fn();
  const originalConsoleError = console.error;
  const mockConsoleError = jest.fn();

  beforeAll(() => {
    window.fetch = mockFetch;
    console.error = mockConsoleError;
  });

  afterAll(() => {
    window.fetch = originalFetch;
    console.error = originalConsoleError;
  });

  afterEach(() => {
    mockFetch.mockClear();
    mockConsoleError.mockClear();
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
    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    };

    mockFetch.mockResolvedValueOnce(mockErrorResponse as Response);

    const page = 1;
    const pageSize = 15;

    await expect(fetchData(page, pageSize)).rejects.toThrow(
      `Failed to fetch medical conditions: ${mockErrorResponse.status} ${mockErrorResponse.statusText}`,
    );

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error fetching medical conditions:',
      expect.any(Error),
    );
  });

  it('handles fetch errors', async () => {
    const errorMessage = 'Network Error';
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    const page = 1;
    const pageSize = 15;

    await expect(fetchData(page, pageSize)).rejects.toThrow(errorMessage);

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error fetching medical conditions:',
      expect.any(Error),
    );
  });
});
