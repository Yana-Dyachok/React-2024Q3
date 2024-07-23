import { fireEvent } from '@testing-library/react';
import Pagination from '../components/ui/pagination/pagination';
import { renderWithRedux } from '../utils/const/render-with-redux';
import { lightTheme } from '../redux/toggle-theme/theme';

describe('Pagination component', () => {
  const totalPages = 10;
  const onPageChange = jest.fn();

  it('renders page numbers correctly', () => {
    const { getByText } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('...')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });

  it('calls onPageChange correctly when a page number button is clicked', () => {
    const { getByText } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    fireEvent.click(getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    const { getByRole } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    const prevButton = getByRole('button', { name: 'prev-page' });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const { getByRole } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={totalPages}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    const nextButton = getByRole('button', { name: 'next-page' });
    expect(nextButton).toBeDisabled();
  });

  it('enables previous button on pages after the first', () => {
    const { getByRole } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={5}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    const prevButton = getByRole('button', { name: 'prev-page' });
    expect(prevButton).toBeEnabled();
  });

  it('enables next button on pages before the last', () => {
    const { getByRole } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={5}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    const nextButton = getByRole('button', { name: 'next-page' });
    expect(nextButton).toBeEnabled();
  });

  it('calls onPageChange when the previous button is clicked and not disabled', () => {
    const { getByRole } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={5}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    fireEvent.click(getByRole('button', { name: 'prev-page' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when the next button is clicked and not disabled', () => {
    const { getByRole } = renderWithRedux(
      <Pagination
        totalPages={totalPages}
        currentPage={5}
        onPageChange={onPageChange}
      />,
      {
        initialState: { theme: { currentTheme: lightTheme } },
      },
    );

    fireEvent.click(getByRole('button', { name: 'next-page' }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });
});
