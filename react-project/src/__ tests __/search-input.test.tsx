import { fireEvent, screen } from '@testing-library/react';
import SearchInput from '../components/search-input/search-input';
import { renderWithRedux } from '../utils/const/render-with-redux';
import { lightTheme } from '../redux/toggle-theme/theme';

describe('SearchInput component', () => {
  test('saves entered value to local storage on button click', () => {
    jest.mock('../utils/hooks/ls-hook', () => ({
      __esModule: true,
      default: () => ['', jest.fn()],
    }));

    const mockOnSearchChange = jest.fn();
    renderWithRedux(<SearchInput onSearchChange={mockOnSearchChange} />, {
      initialState: { theme: { currentTheme: lightTheme } },
    });

    const input = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(mockOnSearchChange).toHaveBeenCalledWith('test query');
  });
});
