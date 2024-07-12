import { render, fireEvent } from '@testing-library/react';
import SearchInput from '../components/search-input/search-input';
import useSearchQuery from '../utils/hooks/ls-hook';

jest.mock('../utils/hooks/ls-hook');

describe('SearchInput component', () => {
  beforeEach(() => {
    (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn()]);
  });

  test('saves entered value to local storage on button click', () => {
    const mockSetSearchQuery = jest.fn();
    (useSearchQuery as jest.Mock).mockReturnValue(['', mockSetSearchQuery]);

    const { getByPlaceholderText, getByRole } = render(
      <SearchInput onSearchChange={() => {}} />,
    );

    const input = getByPlaceholderText('Search');
    const searchButton = getByRole('button', { name: '' });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(mockSetSearchQuery).toHaveBeenCalledWith('test query');
  });

  test('retrieves value from local storage upon mounting', () => {
    (useSearchQuery as jest.Mock).mockReturnValue(['test value', jest.fn()]);

    const { getByPlaceholderText } = render(
      <SearchInput onSearchChange={() => {}} />,
    );

    const input = getByPlaceholderText('Search');

    expect(input).toHaveValue('test value');
  });
});
