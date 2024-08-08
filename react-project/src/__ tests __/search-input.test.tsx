import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '@/app/lib/slices/search-slice';
import SearchInput from '../components/search-input/search-input';
import { useTheme } from '../theme-context/theme-context';
import useSearchQuery from '../utils/hooks/ls-hook';

jest.mock('../utils/hooks/ls-hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../theme-context/theme-context', () => ({
  useTheme: jest.fn(),
}));

describe('SearchInput', () => {
  let mockStore: ReturnType<typeof configureStore>;
  let mockOnSearchChange: jest.Mock;

  beforeEach(() => {
    mockOnSearchChange = jest.fn();
    mockStore = configureStore({
      reducer: { search: searchSlice },
    });

    (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn()]);
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  test('calls onSearchChange on Enter key press', () => {
    const setSearchQuery = jest.fn();
    (useSearchQuery as jest.Mock).mockReturnValue([
      'test query',
      setSearchQuery,
    ]);

    render(
      <Provider store={mockStore}>
        <SearchInput onSearchChange={mockOnSearchChange} />
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockOnSearchChange).toHaveBeenCalledWith('test query');
  });
});
