import fetchMedicalConditionById from '@/app/api/api-get-byid';
import { Conditions } from '@/types/api-interface';

describe('fetchMedicalConditionById', () => {
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
    (console.error as jest.Mock).mockClear();
  });

  it('fetches medical condition successfully', async () => {
    const mockCondition: Conditions = {
      uid: '123',
      name: 'Condition 1',
      psychologicalCondition: true,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ medicalCondition: mockCondition }),
    } as Response);

    const result = await fetchMedicalConditionById('123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/medicalCondition?uid=123',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(result).toEqual(mockCondition);
  });

  it('returns null for non-OK response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);

    const result = await fetchMedicalConditionById('123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/medicalCondition?uid=123',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(result).toBeNull();
  });

  it('returns null on fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const result = await fetchMedicalConditionById('123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/medicalCondition?uid=123',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(result).toBeNull();
  });
});
