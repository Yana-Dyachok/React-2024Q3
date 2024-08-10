import fetchDataConditions from '@/app/api/api-post';

describe('fetchDataConditions', () => {
  const originalFetch = window.fetch;
  const mockFetch = jest.fn();
  const originalConsoleError = console.error;

  beforeAll(() => {
    window.fetch = mockFetch;
    console.error = jest.fn();
  });

  afterAll(() => {
    window.fetch = originalFetch;
    console.error = originalConsoleError;
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it('fetches data conditions successfully', async () => {
    const search = 'Condition';
    const pageSize = 15;
    const pageNumber = 1;
    const mockResponse = {
      data: 'mocked data',
    };

    const response = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    };

    mockFetch.mockResolvedValueOnce(response as unknown as Response);

    const result = await fetchDataConditions(search, pageSize, pageNumber);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://stapi.co/api/v1/rest/medicalCondition/search?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: search }),
      },
    );
    expect(result).toEqual(mockResponse);
    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it('returns null for non-OK response', async () => {
    const search = 'Condition';
    const pageSize = 15;
    const pageNumber = 1;
    const response = {
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    };

    mockFetch.mockResolvedValueOnce(response as unknown as Response);

    const result = await fetchDataConditions(search, pageSize, pageNumber);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://stapi.co/api/v1/rest/medicalCondition/search?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: search }),
      },
    );
    expect(result).toBeNull();
  });

  it('returns null on fetch error and logs the error', async () => {
    const search = 'Condition';
    const pageSize = 15;
    const pageNumber = 1;
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const result = await fetchDataConditions(search, pageSize, pageNumber);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://stapi.co/api/v1/rest/medicalCondition/search?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: search }),
      },
    );
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching data: ',
      new Error('Network Error'),
    );

    consoleErrorSpy.mockRestore();
  });
});
