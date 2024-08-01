import { configureStore } from '@reduxjs/toolkit';
import searchInputReducer, {
  addSearchInput,
} from '../redux/slices/search-slice';
import { getFromLocalStorage } from '../utils/local-storage/ls-handler';
jest.mock('../utils/local-storage/ls-handler', () => ({
  getFromLocalStorage: jest.fn(),
}));

describe('searchInputSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should return the initial state', () => {
    (getFromLocalStorage as jest.Mock).mockReturnValue('defaultSearchQuery');

    const store = configureStore({
      reducer: { searchInput: searchInputReducer },
    });
    const state = store.getState().searchInput;
    console.log('Initial state:', state);

    expect(state).toEqual({
      searchInput: 'defaultSearchQuery',
    });
  });

  test('should handle addSearchInput', () => {
    (getFromLocalStorage as jest.Mock).mockReturnValue('initialSearchQuery');

    const store = configureStore({
      reducer: { searchInput: searchInputReducer },
    });
    store.dispatch(addSearchInput('newSearchQuery'));
    const state = store.getState().searchInput;
    expect(state.searchInput).toBe('newSearchQuery');
  });
});
