import fetchMedicalConditionById from '../api/api-get';
import { Conditions } from '../api/api-interface';

describe('fetchMedicalConditionById', () => {
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
