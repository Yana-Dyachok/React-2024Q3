import fetchDataConditions from '../api/api-post';
import { ApiResponse } from '../api/api-interface';

describe('fetchDataConditions', () => {
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

  it('fetches data conditions successfully', async () => {
    const mockResponse: ApiResponse = {
      page: {
        pageNumber: 0,
        pageSize: 15,
        numberOfElements: 1,
        totalElements: 1,
        totalPages: 1,
        firstPage: true,
        lastPage: false,
      },
      sort: {
        clauses: [['name', 'asc']],
      },
      medicalConditions: [
        {
          uid: '1',
          name: 'Condition 1',
          psychologicalCondition: true,
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const search = 'Condition';
    const pageSize = 15;
    const pageNumber = 1;
    const result = await fetchDataConditions(search, pageSize, pageNumber);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/medicalCondition/search?pageNumber=0&pageSize=15',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: search }),
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it('returns null for non-OK response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const search = 'Condition';
    const pageSize = 15;
    const pageNumber = 1;
    const result = await fetchDataConditions(search, pageSize, pageNumber);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/medicalCondition/search?pageNumber=0&pageSize=15',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: search }),
      },
    );
    expect(result).toBeNull();
  });

  it('returns null on fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const search = 'Condition';
    const pageSize = 15;
    const pageNumber = 1;
    const result = await fetchDataConditions(search, pageSize, pageNumber);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/medicalCondition/search?pageNumber=0&pageSize=15',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: search }),
      },
    );
    expect(result).toBeNull();
  });
});
