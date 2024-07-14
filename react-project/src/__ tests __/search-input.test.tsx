import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from '../components/search-input/search-input';

describe('SearchInput component', () => {
  test('saves entered value to local storage on button click', () => {
    jest.mock('../utils/hooks/ls-hook', () => {
      return jest.fn(() => ['', jest.fn()]);
    });

    const mockOnSearchChange = jest.fn();

    render(<SearchInput onSearchChange={mockOnSearchChange} />);

    const input = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(mockOnSearchChange).toHaveBeenCalledWith('test query');
  });
});
