import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/ui/pagination/pagination';
import { ThemeProvider } from '../theme-context/theme-provider';

describe('Pagination component', () => {
  const totalPages = 10;
  const onPageChange = jest.fn();

  const renderWithTheme = (currentPage: number) => {
    return render(
      <ThemeProvider>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </ThemeProvider>,
    );
  };

  it('disables next button on last page', () => {
    const { getByRole } = renderWithTheme(totalPages);

    const nextButton = getByRole('button', { name: 'next-page' });
    expect(nextButton).toBeDisabled();
  });

  it('enables previous button on pages after the first', () => {
    const { getByRole } = renderWithTheme(2);

    const prevButton = getByRole('button', { name: 'prev-page' });
    expect(prevButton).toBeEnabled();
  });

  it('calls onPageChange when the previous button is clicked and not disabled', () => {
    const { getByRole } = renderWithTheme(2);

    fireEvent.click(getByRole('button', { name: 'prev-page' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when the next button is clicked and not disabled', () => {
    const { getByRole } = renderWithTheme(1);

    fireEvent.click(getByRole('button', { name: 'next-page' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
