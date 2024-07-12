import { renderHook, act } from '@testing-library/react';
import useSearchQuery from '../utils/hooks/ls-hook';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/local-storage/ls-handler';
jest.mock('../utils/local-storage/ls-handler', () => ({
  getFromLocalStorage: jest.fn(),
  saveToLocalStorage: jest.fn(),
}));

describe('useSearchQuery hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with value from localStorage', () => {
    const mockKey = 'testKey';
    const mockSavedValue = 'initialValue';
    (getFromLocalStorage as jest.Mock).mockReturnValueOnce(mockSavedValue);
    const { result } = renderHook(() => useSearchQuery(mockKey));
    expect(result.current[0]).toBe(mockSavedValue);
  });

  it('should update search query and localStorage on change', () => {
    const mockKey = 'testKey';
    const { result } = renderHook(() => useSearchQuery(mockKey));
    const newSearchQuery = 'newQuery';
    act(() => {
      result.current[1](newSearchQuery);
    });
    expect(saveToLocalStorage).toHaveBeenCalledWith(mockKey, newSearchQuery);
  });
});
